import ko from "knockout";
import { PlantStage } from './models/plant-stage.js';
import { PRODUCT_CATALOG } from './models/product-registry.js';
import { PLANT_STAGES_DATA } from './models/plant-stage-data.js';
import { UNITS, MIXING_ORDER, GALLON_TO_LITER_FACTOR } from './models/constants.js';

import "../styles/index.scss";
import './controls/custom-slider.js';
import './controls/custom-switch.js';
import './controls/collapsable-fieldset.js';
import './controls/custom-select.js';

function calculateAmount(productKey, reservoirSize, conversionFactor, strengthMultiplier) {
  const product = PRODUCT_CATALOG[productKey];
  if (!product) return 0;

  return (
    product.baseValue *
    conversionFactor *
    (strengthMultiplier / 100) *
    reservoirSize
  );
}

const mediaQuery = window.matchMedia('(max-width: 768px)');

function updateCustomSelectLayout() {
  setTimeout(() => {
    const customSelect = document.querySelector('custom-select');
    if (customSelect) {
      const newLayout = mediaQuery.matches ? 'wrap' : 'fill';
      customSelect.setAttribute('layout', newLayout);
    }
  }, 0); 
}

updateCustomSelectLayout();
mediaQuery.addEventListener('change', updateCustomSelectLayout);

const STORAGE_KEY = 'jacksNutrientCalculatorState';

class ViewModel {
  constructor() {
    this.reservoirSize = ko.observable(5);
    this.selectedUnit = ko.observable(UNITS.GALLONS);
    this.nutrientStrength = ko.observable(100);
    this.selectedPlantStage = ko.observable('Propagation');

    this.loadState();
    this.setupStateSaving();

    this.conversionFactor = ko.computed(() => {
      return this.selectedUnit() === UNITS.GALLONS
        ? 1
        : 1 / GALLON_TO_LITER_FACTOR;
    });

    this.reservoirUnits = ko.computed(() =>
      this.selectedUnit() === UNITS.LITERS ? "Liters" : "Gallons"
    );

    this.reservoirLabel = ko.computed(() =>
      ` (${this.reservoirSize()} ${this.reservoirUnits()})`
    );

    this.strengthLabel = ko.computed(() =>
      ` (${this.nutrientStrength()}%)`
    );

    this.tableLabel = ko.computed(() => `Amount per ${this.reservoirSize()} ${this.reservoirUnits()} at ${this.nutrientStrength()}%`);

    this.plantStages = ko.observableArray(
      PLANT_STAGES_DATA.map(data => new PlantStage(
        data.stage, data.targetEc, data.targetPpm500, data.targetPpm700, data.formula
      ))
    );
    
    this.currentStage = ko.computed(() => this.plantStages().find(
        s => s.stage === this.selectedPlantStage()
      ) || new PlantStage('Default', 0, 0, 0, ['PlainWater']));

    this.filteredProducts = ko.computed(() => {
      const stage = this.currentStage();
      if (!stage || !stage.formula) return [];

      const rSize = this.reservoirSize();
      const cFactor = this.conversionFactor();
      const strength = this.nutrientStrength();

      const productsWithAmounts = stage.formula.map(key => {
        const product = PRODUCT_CATALOG[key];
        if (!product) return null;

        const grams = calculateAmount(key, rSize, cFactor, strength);
        const ounces = grams * 0.03527396;
        
        return {
          ...product,
          grams: grams.toFixed(2),
          ounces: ounces.toFixed(2)
        };
      }).filter(p => p !== null); 

      return productsWithAmounts.sort((a, b) => {
        const orderA = MIXING_ORDER.indexOf(a.key);
        const orderB = MIXING_ORDER.indexOf(b.key);

        const indexA = orderA === -1 ? 999 : orderA;
        const indexB = orderB === -1 ? 999 : orderB;

        return indexA - indexB;
      });
    });

  }

  loadState() {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const state = JSON.parse(savedState);
        
        if (state.reservoirSize !== undefined) {
          this.reservoirSize(parseFloat(state.reservoirSize));
        }
        if (state.selectedUnit) {
          this.selectedUnit(state.selectedUnit);
        }
        if (state.nutrientStrength !== undefined) {
          this.nutrientStrength(parseInt(state.nutrientStrength));
        }
        if (state.selectedPlantStage) {
          this.selectedPlantStage(state.selectedPlantStage);
        }
      }
    } catch (e) {
      console.error("Could not load state from localStorage:", e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  saveState() {
    const stateToSave = {
      reservoirSize: this.reservoirSize(),
      selectedUnit: this.selectedUnit(),
      nutrientStrength: this.nutrientStrength(),
      selectedPlantStage: this.selectedPlantStage()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Could not save state to localStorage:", e);
    }
  }

  setupStateSaving() {
    const observablesToWatch = [
      this.reservoirSize,
      this.selectedUnit,
      this.nutrientStrength,
      this.selectedPlantStage
    ];

    const throttledSave = ko.pureComputed(this.saveState, this).extend({ throttle: 500 });

    observablesToWatch.forEach(observable => {
      observable.subscribe(throttledSave);
    });
  }
}

Promise.all([
    customElements.whenDefined("custom-slider"),
    customElements.whenDefined("custom-unit-switch"),
    customElements.whenDefined("custom-select"),
    customElements.whenDefined("collapsible-fieldset")
]).then(() => {
    ko.applyBindings(new ViewModel());
});
