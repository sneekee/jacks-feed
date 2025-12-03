import switchStyles from '../../styles/controls/custom-switch.scss?inline';

export class CustomUnitSwitch extends HTMLElement {
  static formAssociated = true;

  static get observedAttributes() {
    return [
      "value",
      "disabled",
      "option-a-label",
      "option-b-label",
      "option-a-value",
      "option-b-value",
      "required"
    ];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this.attachShadow({ mode: "open" });

    this.optionAValue = this.getAttribute("option-a-value") || "a";
    this.optionBValue = this.getAttribute("option-b-value") || "b";
    this.optionALabel = this.getAttribute("option-a-label") || "Option A";
    this.optionBLabel = this.getAttribute("option-b-label") || "Option B";

    this._value = this.getAttribute("value") || this.optionAValue;

    this.shadowRoot.innerHTML = `
            <style>${switchStyles}</style>

            <div class="switch-layout">
                <span class="label label-a">${this.optionALabel}</span>

                <div class="switch-root"
                     role="switch"
                     tabindex="0"
                     aria-checked="false"
                     aria-disabled="false">
                    <div class="track"></div>
                    <div class="thumb"></div>
                </div>

                <span class="label label-b">${this.optionBLabel}</span>
            </div>
        `;

    this.$root = this.shadowRoot.querySelector(".switch-root");
    this.$thumb = this.shadowRoot.querySelector(".thumb");
    this.$labelA = this.shadowRoot.querySelector(".label-a");
    this.$labelB = this.shadowRoot.querySelector(".label-b");

    this._bindUIEvents();
    this._applyStateToDOM();
    
    this._resizeObserver = new ResizeObserver(this._updateLabelWidths.bind(this));
  }

  get value() {
    return this._value;
  }
  set value(v) {
    const newVal = v === null ? this.optionAValue : v;
    if (newVal !== this.optionAValue && newVal !== this.optionBValue) {
      console.warn(`Attempted to set invalid value: ${newVal}. Value must be '${this.optionAValue}' or '${this.optionBValue}'.`);
      return;
    }
    
    if (this._value === newVal) return;
    this._value = newVal;
    this._internals.setFormValue(newVal);
    this._applyStateToDOM();
    this._dispatchChange();
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(val) {
    if (val) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "value":
        this.value = newVal;
        break;
      case "disabled":
        this._applyStateToDOM();
        break;
      case "option-a-label":
        this.optionALabel = newVal;
        this.$labelA.textContent = newVal;
        this._updateLabelWidths();
        break;
      case "option-b-label":
        this.optionBLabel = newVal;
        this.$labelB.textContent = newVal;
        this._updateLabelWidths();
        break;
      case "option-a-value":
        this.optionAValue = newVal;
        if (this._value === oldVal) this.value = newVal; 
        break;
      case "option-b-value":
        this.optionBValue = newVal;
        if (this._value === oldVal) this.value = newVal;
        break;
      case "required":
        this._internals.setValidity(
          this.required && !this.value ? { valueMissing: true } : {}
        );
        break;
    }
  }

  formResetCallback() {
    this.value = this.optionAValue;
  }

  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }

  _bindUIEvents() {
    this.$root.addEventListener("click", () => this._toggle());

    this.$root.addEventListener("keydown", (e) => this._onKey(e));

    this.$root.addEventListener("touchstart", (e) => this._touchStart(e));
    this.$root.addEventListener("touchmove", (e) => this._touchMove(e));
    this.$root.addEventListener("touchend", () => this._touchEnd());

    this.$labelA.addEventListener("click", () => { if (!this.disabled) this.value = this.optionAValue });
    this.$labelB.addEventListener("click", () => { if (!this.disabled) this.value = this.optionBValue });
  }

  _toggle() {
    if (this.disabled) return;
    this.value = (this._value === this.optionAValue) ? this.optionBValue : this.optionAValue;
  }

  _onKey(e) {
    if (this.disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this._toggle();
    }
  }

  _touchStart(e) {
    if (this.disabled) return;
    this._dragging = true;
    this._startX = e.touches[0].clientX;
    this.$root.classList.add("dragging");
  }

  _touchMove(e) {
    if (!this._dragging) return;
    const deltaX = e.touches[0].clientX - this._startX;
    const width = this.$root.offsetWidth;
    let progress = deltaX / width;

    if (this._value === this.optionBValue) {
      progress = 1 + progress;
    }

    this._dragProgress = Math.max(0, Math.min(1, progress));
    
    const thumbPosition = this._dragProgress * 100;
    this.$thumb.style.transform = `translateX(${thumbPosition}%)`;
    
    if (this._dragProgress > 0.5) this.$root.classList.add("checked");
    else this.$root.classList.remove("checked");
  }

  _touchEnd() {
    if (!this._dragging) return;
    this._dragging = false;
    this.$root.classList.remove("dragging");
    this.$thumb.style.transform = '';
    const newState = this._dragProgress > 0.5 ? this.optionBValue : this.optionAValue;
    this.value = newState;
  }

  _applyStateToDOM() {
    const isChecked = this._value === this.optionBValue;

    this.$root.setAttribute("aria-checked", isChecked);
    this.$root.setAttribute("aria-disabled", this.disabled);
    this.$root.classList.toggle("checked", isChecked);
    this.$root.classList.toggle("disabled", this.disabled);
    this.$root.tabIndex = this.disabled ? -1 : 0;

    this.$labelA.classList.toggle("active", !isChecked);
    this.$labelB.classList.toggle("active", isChecked);
  }

  _dispatchChange() {
    this.dispatchEvent(new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    }));
  }

  _updateLabelWidths() {
    this.$labelA.style.width = '';
    this.$labelB.style.width = '';
    
    const maxWidth = Math.max(this.$labelA.offsetWidth, this.$labelB.offsetWidth);
    this.$labelA.style.width = maxWidth + "px";
    this.$labelB.style.width = maxWidth + "px";
  }

  connectedCallback() {
    this._updateLabelWidths();
    this._resizeObserver.observe(this.$labelA);
    this._resizeObserver.observe(this.$labelB);
    
    if (window.ko && !ko.bindingHandlers.unitSwitchApplied) {
      CustomUnitSwitch.applyKnockoutBinding();
      ko.bindingHandlers.unitSwitchApplied = true;
    }
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
  }

  static applyKnockoutBinding() {
    if (!window.ko) return;
    ko.bindingHandlers.unitSwitch = {
      init(el, valueAccessor) {
        const obs = valueAccessor();
        el.addEventListener("change", e => obs(e.detail.value));
      },
      update(el, valueAccessor) {
        const obs = valueAccessor();
        el.value = obs();
      }
    };
  }
}

customElements.define("custom-unit-switch", CustomUnitSwitch);