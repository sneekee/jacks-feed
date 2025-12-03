import collapsibleFieldsetStyles from '../../styles/controls/collapsable-fieldset.scss?inline';

const template = document.createElement('template');
template.innerHTML = `
  <fieldset>
		<div class="clickable-top" role="button" tabindex="0" aria-expanded="false"></div>
		<legend></legend>
		<div class="content-wrapper">
			<div part="content">
				<slot></slot>
			</div>
		</div>
	</fieldset>
`;

class CollapsibleFieldset extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `<style>${collapsibleFieldsetStyles}</style>`;
			this.shadowRoot.appendChild(template.content.cloneNode(true));

		this._onToggle = this._onToggle.bind(this);
	}

	connectedCallback() {
		this.fieldset = this.shadowRoot.querySelector('fieldset');
		this.legendEl = this.shadowRoot.querySelector('legend');
		this.wrapper = this.shadowRoot.querySelector('.content-wrapper');
		this.clickableTop = this.shadowRoot.querySelector('.clickable-top');

		const originalLegend = this.querySelector('legend');
		if (originalLegend) {
			this.legendEl.textContent = originalLegend.textContent;
			originalLegend.style.display = 'none';
		}
		
		const isOpen = this.hasAttribute('open');
		this.clickableTop.setAttribute('aria-expanded', isOpen);

		this.legendEl.addEventListener('click', this._onToggle);
		this.clickableTop.addEventListener('click', this._onToggle);
		this.clickableTop.addEventListener('keydown', (e) => {
			if (e.key === ' ' || e.key === 'Enter') {
				e.preventDefault();
				this._onToggle();
			}
		});

		this.resizeObserver = new ResizeObserver(() => {
			if (this.hasAttribute('open') && this.wrapper.style.height !== 'auto') {
				this.wrapper.style.height = this.wrapper.scrollHeight + 'px';
			}
		});
		this.resizeObserver.observe(this.wrapper);
		
		if (isOpen) {
			this.wrapper.style.height = this.wrapper.scrollHeight + 'px';
			requestAnimationFrame(() => {
				this.wrapper.style.height = 'auto';
			});
		}
	}

	disconnectedCallback() {
		this.legendEl.removeEventListener('click', this._onToggle);
		this.clickableTop.removeEventListener('click', this._onToggle);
		this.clickableTop.removeEventListener('keydown', this._onToggle);
		this.resizeObserver.disconnect();
	}

	_onToggle() {
		if (this.hasAttribute('open')) {
			this._collapse();
		} else {
			this._expand();
		}
	}

	_expand() {
		this.setAttribute('open', '');
		this.clickableTop.setAttribute('aria-expanded', 'true');
		
		const height = this.wrapper.scrollHeight + 'px';
		this.wrapper.style.height = height;

		this.wrapper.addEventListener(
			'transitionend',
			() => {
				if (this.hasAttribute('open')) this.wrapper.style.height = 'auto';
			},
			{ once: true }
		);
	}

	_collapse() {
		this.clickableTop.setAttribute('aria-expanded', 'false');
		const height = this.wrapper.scrollHeight + 'px';
		this.wrapper.style.height = height;
		this.wrapper.getBoundingClientRect();
		this.wrapper.style.height = '0px';
		this.removeAttribute('open');
	}
}

customElements.define('collapsible-fieldset', CollapsibleFieldset);