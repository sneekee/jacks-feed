import sliderStyles from '../styles/custom-slider.scss?inline';

const template = document.createElement('template');
template.innerHTML = `
  <div class="slider-padding">
    <div class="slider-container">
      <div class="slider-track"></div>
      <div class="slider-fill"></div>
      <!-- tabindex="0" and role="slider" remain on the internal thumb for keyboard input -->
      <div class="slider-thumb" tabindex="0" role="slider"></div> 
      <div class="slider-tooltip"></div>
    </div>
  </div>
`;

export class CustomSlider extends HTMLElement {
	static formAssociated = true;

	static get observedAttributes() {
		return ['min', 'max', 'value', 'step', 'show-stops', 'tooltip-format'];
	}

	constructor() {
		super();
		this.internals = this.attachInternals();

		this.attachShadow({ mode: 'open', delegatesFocus: true });
		this.shadowRoot.innerHTML = `<style>${sliderStyles}</style>`;
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.track = this.shadowRoot.querySelector('.slider-track');
		this.fill = this.shadowRoot.querySelector('.slider-fill');
		this.thumb = this.shadowRoot.querySelector('.slider-thumb');
		this.tooltip = this.shadowRoot.querySelector('.slider-tooltip');

		this.dragging = false;
		this._hovering = false;
		this._focused = false;

		this.min = parseFloat(this.getAttribute('min')) || 0;
		this.max = parseFloat(this.getAttribute('max')) || 100;
		this.step = parseFloat(this.getAttribute('step')) || 1;
		this.showStops = this.hasAttribute('show-stops');
		this.tooltipFormat = this.getAttribute('tooltip-format') || '{value}';
		this.stops = [];

		this._value = parseFloat(this.getAttribute('value')) || 50;

		this.setAttribute('role', 'slider');
		this.setAttribute('aria-valuemin', this.min);
		this.setAttribute('aria-valuemax', this.max);
		this.setAttribute('aria-valuenow', this._value);

		this.internals.setFormValue(this._value);

		this._bindEvents();
		this._updateStops();
		this._updateUI();
	}

	get value() {
		return this._value;
	}

	set value(newValue) {
		const oldValue = this._value;
		const clampedValue = Math.min(this.max, Math.max(this.min, parseFloat(newValue)));
		if (oldValue === clampedValue) return;

		this._value = clampedValue;
		this.setAttribute('value', this._value);
		this.setAttribute('aria-valuenow', this._value);

		this.internals.setFormValue(this._value.toString());

		this._updateUI();
	}


	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		switch (name) {
			case 'min':
			case 'max':
			case 'step':
				this[name] = parseFloat(newValue);
				if (name === 'min') this.setAttribute('aria-valuemin', this.min);
				if (name === 'max') this.setAttribute('aria-valuemax', this.max);
				break;
			case 'value':
				this.value = parseFloat(newValue);
				break;
			case 'show-stops':
				this.showStops = this.hasAttribute('show-stops');
				break;
			case 'tooltip-format':
				this.tooltipFormat = newValue || '{value}';
				break;
		}
		this._updateStops();
		this._updateUI();
	}

	_bindEvents() {
		this.thumb.addEventListener('pointerdown', this._startDrag.bind(this));

		this.thumb.addEventListener('keydown', this._handleKeyboard.bind(this));

		this.addEventListener('focus', this._handleFocus.bind(this));
		this.addEventListener('blur', this._handleBlur.bind(this));

		const container = this.shadowRoot.querySelector('.slider-container');
		container.addEventListener('mouseenter', () => { this._hovering = true; this._updateUI(); });
		container.addEventListener('mouseleave', () => { this._hovering = false; this._updateUI(); });

		container.addEventListener('pointerdown', (e) => {
			if (e.target === this.thumb) return;
			this.trackRect = this.track.getBoundingClientRect();
			this._setValueFromPointer(e.clientX);
			this.dragging = true;
			this.focus();
			e.preventDefault();
		});

		window.addEventListener('pointermove', this._drag.bind(this));
		window.addEventListener('pointerup', this._stopDrag.bind(this));
	}

	_setValueFromPointer(clientX) {
		let newValue = ((clientX - this.trackRect.left) / this.trackRect.width) * (this.max - this.min) + this.min;
		newValue = Math.round(newValue / this.step) * this.step;

		this.value = newValue;

		this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value } }));
		this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
	}

	_startDrag(e) {
		e.preventDefault();
		this.dragging = true;
		this.trackRect = this.track.getBoundingClientRect();
		this.focus();
	}

	_drag(e) {
		if (!this.dragging) return;

		this._setValueFromPointer(e.clientX);

		this._updateUI();

		this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value } }));
	}

	_stopDrag() {
		if (!this.dragging) return;
		this.dragging = false;
		this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
		this._updateUI();
	}

	_handleKeyboard(e) {
		if (e.defaultPrevented) return;
		let step = this.step;
		let changed = false;

		if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
			e.preventDefault();
			this.value = Math.max(this.min, this.value - step);
			changed = true;
		}
		if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
			e.preventDefault();
			this.value = Math.min(this.max, this.value + step);
			changed = true;
		}
		if (e.key === 'Home') {
			e.preventDefault();
			this.value = this.min;
			changed = true;
		}
		if (e.key === 'End') {
			e.preventDefault();
			this.value = this.max;
			changed = true;
		}

		if (changed) {
			this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value } }));
			this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
		}
	}


	_handleFocus() {
		this._focused = true;
		this.thumb.classList.add('focused');
		this._updateUI();
	}

	_handleBlur() {
		this._focused = false;
		this.thumb.classList.remove('focused');
		this._updateUI();
	}

	_updateUI() {
		const range = this.max - this.min;
		const percent = range === 0 ? 0 : ((this.value - this.min) / range) * 100;
		const trackWidth = this.track.offsetWidth;

		this.fill.style.width = `${percent}%`;

		const thumbWidth = this.thumb.offsetWidth;
		const thumbRadius = thumbWidth / 2;
		const visualOffset = (thumbRadius / trackWidth) * 100;

		const clampedPercent = Math.min(100, Math.max(0, percent));
		let thumbLeft = clampedPercent;
		if (clampedPercent === 0) thumbLeft = visualOffset;
		else if (clampedPercent === 100) thumbLeft = 100 - visualOffset;
		else thumbLeft = Math.min(100 - visualOffset, Math.max(visualOffset, percent));

		this.thumb.style.left = `${thumbLeft}%`;

		this.setAttribute('aria-valuenow', this.value);

		this.tooltip.textContent = this.tooltipFormat.replace('{value}', this.value);
		this.tooltip.style.visibility = this.dragging || this._hovering || this._focused ? 'visible' : 'hidden';

		const tooltipWidth = this.tooltip.offsetWidth;
		const tooltipLeftPx = (clampedPercent / 100) * trackWidth;

		if (tooltipLeftPx - tooltipWidth / 2 < 0) {
			this.tooltip.style.left = `0px`;
			this.tooltip.style.transform = 'translateX(0)';
		} else if (tooltipLeftPx + tooltipWidth / 2 > trackWidth) {
			this.tooltip.style.left = `100%`;
			this.tooltip.style.transform = 'translateX(-100%)';
		} else {
			this.tooltip.style.left = `${clampedPercent}%`;
			this.tooltip.style.transform = 'translateX(-50%)';
		}
	}

	_updateStops() {
		this.shadowRoot.querySelectorAll('.slider-stop').forEach(el => el.remove());
		if (!this.showStops) return;

		const stepCount = Math.floor((this.max - this.min) / this.step);
		for (let i = 1; i < stepCount; i++) {
			const stopEl = document.createElement('div');
			stopEl.className = 'slider-stop';
			const stopValue = this.min + i * this.step;
			const percent = ((stopValue - this.min) / (this.max - this.min)) * 100;
			stopEl.style.left = `${percent}%`;
			this.shadowRoot.querySelector('.slider-container').appendChild(stopEl);

			stopEl.addEventListener('pointerdown', (e) => {
				e.stopPropagation();
				this.trackRect = this.track.getBoundingClientRect();
				this._setValueFromPointer(e.clientX);
				this.focus();
			});
		}
	}
}

customElements.define('custom-slider', CustomSlider);