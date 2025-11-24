import ko from "knockout";
import "../styles/index.scss";
import './custom-slider.js';
import './collapsable-fieldset.js';

class ViewModel {
    constructor() {
        this.reservoirSize = ko.observable(5);
        this.selectedUnit = ko.observable('gallons');
        this.nutrientStrength = ko.observable(100);

        this.reservoirUnits = ko.computed(() => {
            return this.selectedUnit() === 'liters' ? 'Liters' : 'Gallons';
        });

        this.reservoirLabel = ko.computed(() => {
            return ` (${this.reservoirSize()} ${this.reservoirUnits()})`;
        });

        this.strengthLabel = ko.computed(() => {
            return ` (${this.nutrientStrength()}% of recommended feed)`;
        });
    }
}

ko.applyBindings(new ViewModel());