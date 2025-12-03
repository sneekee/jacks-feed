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
    this._value = "";

    this._observer = new MutationObserver(() => {
      this._parseLightDOM();
      this._render();
    });
  }

  connectedCallback() {
    this._upgradeProperty("value");
    this._parseLightDOM();
    this._render();
    this._attachEvents();
    this._observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["value"]
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let v = this[prop];
      delete this[prop];
      this[prop] = v;
    }
  }

  _parseLightDOM() {
    this._options = [...this.querySelectorAll("[value]")].map(el => ({
      label: el.textContent.trim(),
      value: el.getAttribute("value")
    }));

    if (!this._value && this._options.length) {
      this.value = this._options[0].value;
    }
  }

  _render() {
    this.listbox.innerHTML = "";
    let selectedButton = null;

    this._options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.setAttribute("role", "option");
      btn.textContent = opt.label;
      btn.dataset.index = i;
      btn.value = opt.value;

      if (opt.value === this._value) {
        btn.setAttribute("selected", "");
        btn.setAttribute("aria-selected", "true");
        selectedButton = btn;
      } else {
        btn.removeAttribute("selected");
        btn.setAttribute("aria-selected", "false");
      }

      this.listbox.appendChild(btn);
    });
    
    if (selectedButton && this.listbox === this.shadowRoot.activeElement) {
        selectedButton.focus();
        selectedButton.scrollIntoView({ block: 'nearest' });
    }
  }

  _attachEvents() {
    this.listbox.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") {
        this.value = e.target.value;
        this._emit();
      }
    });

    this.listbox.addEventListener("keydown", e => {
      const currentIndex = this._options.findIndex(o => o.value === this._value);
      const last = this._options.length - 1;
      let next = currentIndex;
      let handled = false;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = Math.min(currentIndex + 1, last);
          handled = true;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = Math.max(currentIndex - 1, 0);
          handled = true;
          break;
        case "Home":
          next = 0;
          handled = true;
          break;
        case "End":
          next = last;
          handled = true;
          break;
        case " ":
        case "Enter":
          handled = true;
          break;
        default:
          return;
      }
      
      e.preventDefault();
      
      if (handled && e.key !== " " && e.key !== "Enter") {
        this.value = this._options[next].value;
        this._emit();
      }
    });
  }

  _emit() {
    this.dispatchEvent(new Event("input", { bubbles: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  get value() {
    return this._value;
  }
  set value(v) {
    if (v === this._value) return;
    this._value = v;
    this._internals.setFormValue(v);
    this._render();
  }

  get name() {
    return this.getAttribute("name");
  }
  set name(v) {
    this.setAttribute("name", v);
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(v) {
    v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }

  formResetCallback() {
    if (this._options.length) {
      this.value = this._options[0].value;
    }
  }

  static get observedAttributes() {
    return ["disabled", "layout"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      if (this.disabled) {
        this.listbox.setAttribute("aria-disabled", "true");
      } else {
        this.listbox.removeAttribute("aria-disabled");
      }
    }

    if (name === "layout") {
      this._render();
    }
  }
}

customElements.define("custom-select", CustomSelect);