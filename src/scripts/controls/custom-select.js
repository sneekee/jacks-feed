import selectStyles from '../../styles/controls/custom-select.scss?inline';

class CustomSelect extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._shadow = this.attachShadow({ mode: "open" });

    this._shadow.innerHTML = `
      <style>${selectStyles}</style>
      <div id="listbox" role="listbox" tabindex="0"></div>
    `;

    this.listbox = this._shadow.querySelector("#listbox");

    this._options = [];
    this._value = null;
  }

  connectedCallback() {
    this._render();
    this._attachEvents();
  }

  // -----------------------------
  // KO OPTIONS SUPPORT
  // -----------------------------
  set options(list) {
    if (!Array.isArray(list)) return;
    this._rawOptions = list;
    this._rebuildOptions();
  }

  get options() {
    return this._rawOptions;
  }

  set optionsText(prop) {
    this._optionsText = prop;
    this._rebuildOptions();
  }

  get optionsText() {
    return this._optionsText;
  }

  set optionsValue(prop) {
    this._optionsValue = prop;
    this._rebuildOptions();
  }

  get optionsValue() {
    return this._optionsValue;
  }

  _rebuildOptions() {
    if (!Array.isArray(this._rawOptions)) return;

    this._options = this._rawOptions.map(item => ({
      raw: item,
      label: this._optionsText ? item[this._optionsText] : String(item),
      value: this._optionsValue ? item[this._optionsValue] : item
    }));

    this._render();
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  _render() {
    if (!this.listbox) return;

    this.listbox.innerHTML = "";

    this._options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.setAttribute("role", "option");
      btn.textContent = opt.label;
      btn.dataset.index = i;
      btn.value = opt.value;

      if (opt.value == this._value) {
        btn.setAttribute("selected", "");
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.removeAttribute("selected");
        btn.setAttribute("aria-selected", "false");
      }

      this.listbox.appendChild(btn);
    });
  }

  // -----------------------------
  // EVENTS
  // -----------------------------
  _attachEvents() {
    this.listbox.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") {
        this.value = e.target.value;
        this._emit();
      }
    });
  }

  _emit() {
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // -----------------------------
  // VALUE
  // -----------------------------
  get value() {
    return this._value;
  }

  set value(v) {
    if (v === this._value) return;
    this._value = v;

    // Only update form value if inside a real form
    if (this._internals && this._internals.form) {
      this._internals.setFormValue(v);
    }

    this._render();
  }


  // -----------------------------
  // DISABLED
  // -----------------------------
  get disabled() {
    return this.hasAttribute("disabled");
  }

  set disabled(v) {
    v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  attributeChangedCallback(name) {
    if (name === "disabled") {
      if (this.disabled) {
        this.listbox.setAttribute("aria-disabled", "true");
      } else {
        this.listbox.removeAttribute("aria-disabled");
      }
    }
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      const v = this[prop];
      delete this[prop];
      this[prop] = v;
    }
  }
}

customElements.define("custom-select", CustomSelect);
