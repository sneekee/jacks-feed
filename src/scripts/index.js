import ko from "knockout";
import { FEED_SCHEDULES } from "./data/feed-schedule-registry.js";
import { UNITS } from './data/constants.js';
import { Options, ReservoirScale } from "./models/options.js";
import { PlantStage } from "./models/plant-stage.js";

import './ko-binding-handlers.js';

import "../styles/index.scss";
import './controls/custom-slider.js';
import './controls/custom-switch.js';
import './controls/collapsable-fieldset.js';
import './controls/custom-select.js';

function calculateAmount(baseGrams, reservoirSize, conversionFactor, strengthMultiplier) {
  return (
    baseGrams *
    conversionFactor *
    (strengthMultiplier / 100) *
    reservoirSize
  );
}

const mediaQuery = window.matchMedia('(max-width: 768px)');

function updateCustomSelectLayout() {
  setTimeout(() => {
    const customSelect = document.querySelector('.formula > custom-select.stages');
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
    this._isLoadingState = true;
    this.selectedFeedSchedule = ko.observable(FEED_SCHEDULES[321]);
    this.options = ko.observable(new Options({
      reservoirScale: ReservoirScale["1-20"],
      reservoirSize: 5,
      reservoirUnits: UNITS.GALLONS,
      strength: 100,
      selectedMedium: this.selectedFeedSchedule().mediums[0]
    }));

    this.selectedMedium = ko.observable(this.selectedFeedSchedule().mediums[0].key);
    this.selectedMediumObj = ko.pureComputed(() => { 
      return this.availableMediums().find(m => m.key === this.selectedMedium());
    });

    this.availableMediums = ko.pureComputed(() => this.selectedFeedSchedule().mediums );

    this.availableStages = ko.pureComputed(() => { const medium = this.selectedMediumObj(); return medium ? medium.stages : []; });

    // Initialize selectedStage safely 
    this.selectedStage = ko.observable(); const initialMedium = this.selectedMediumObj(); 
    if (initialMedium && initialMedium.stages.length > 0) { 
      this.selectedStage(initialMedium.stages[0].key); 
    }
    this.selectedStageObj = ko.pureComputed(() => this.availableStages().find(s => s.key === this.selectedStage()) );
    
    
    this.currentStage = ko.pureComputed(() => {
      const stage = this.selectedStageObj();
      return stage || new PlantStage('Default', 0, 0, 0, ['PlainWater']);
    });


    this.productsWithAmounts = ko.computed(() => {
      const stage = this.selectedStageObj();
      if (!this.selectedStageObj() || !this.selectedStageObj().recipe) return [];

      const rSize = this.options().reservoirSize();
      const cFactor = this.options().conversionFactor();
      const strength = this.options().strength();

      const productsWithAmounts = this.selectedStageObj().recipe.map(recipeEntry => {
        const product = recipeEntry.product;
        if (!product) return null;

        const grams = calculateAmount(recipeEntry.baseGrams, rSize, cFactor, strength);
        const ounces = grams * 0.03527396;
        
        return {
          ...product,
          grams: grams.toFixed(2),
          ounces: ounces.toFixed(2),
          ppm: `${recipeEntry.basePPM} ppm ${recipeEntry.baseMN}`
        };
      }).filter(p => p !== null); 

      return productsWithAmounts;
    });

    this.selectedMedium.subscribe(newKey => { 
      if (this._isLoadingState) return;

      const medium = this.availableMediums().find(m => m.key === newKey); 
      if (medium && medium.stages.length > 0) { 
        this.selectedStage(medium.stages[0].key); 
      } 
    });

    
    this.loadState();
    this._isLoadingState = false;
    this.setupStateSaving();

  }

  loadState() {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (!savedState) return;

      const state = JSON.parse(savedState);

      if (state.reservoirSize !== undefined) {
        this.options().reservoirSize(parseFloat(state.reservoirSize));
      }

      if (state.selectedUnit) {
        this.selectedUnit(state.selectedUnit);
      }

      if (state.strength !== undefined) {
        this.options().strength(parseInt(state.strength));
      }

      if (state.selectedMedium) {
        this.selectedMedium(state.selectedMedium);
      }

      if (state.selectedStage) {
        // Validate stage exists in the selected medium
        const medium = this.selectedMediumObj();
        const stageExists = medium?.stages.some(s => s.key === state.selectedStage);

        this.selectedStage(
          stageExists ? state.selectedStage : medium?.stages[0]?.key
        );
      }

    } catch (e) {
      console.error("Could not load state from localStorage:", e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  saveState() {
    const stateToSave = {
      reservoirSize: this.options().reservoirSize(),
      reservoirUnits: this.options().reservoirUnits(),
      strength: this.options().strength(),
      selectedMedium: this.selectedMedium(),
      selectedStage: this.selectedStage()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Could not save state to localStorage:", e);
    }
  }

  setupStateSaving() {
    this._autoSave = ko.pureComputed(() => {
      // establish dependencies
      this.options().reservoirSize();
      this.options().reservoirUnits();
      this.options().strength();
      this.selectedMedium();
      this.selectedStage();

      this.saveState();
    }).extend({ throttle: 300 });
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
