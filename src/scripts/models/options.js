import ko from "knockout";
import { UNITS, GALLON_TO_LITER_FACTOR } from "../data/constants.js";

export const ReservoirScale = {
    '1-20': {min: 1, max: 20},
    '20-40': {min: 20, max: 40},
    '40-60': {min: 40, max: 60},
    '60-80': {min:60, max: 80}
}

export class Options {
    constructor({reservoirScale, reservoirSize, reservoirUnits, strength, selectedMedium, selectedStage}){
        this.reservoirScale = ko.observable(reservoirScale);
        this.reservoirSize = ko.observable(reservoirSize);
        this.reservoirUnits = ko.observable(reservoirUnits);
        this.strength = ko.observable(strength);
        this.selectedMedium = ko.observable(selectedMedium);
        this.selectedStage = ko.observable(selectedStage);

        this.reservoirUnitsLabel = ko.pureComputed(() => this.reservoirUnits() === UNITS.LITERS ? "Liters" : "Gallons");

        this.reservoirLabel = ko.pureComputed(() => ` (${this.reservoirSize()} ${this.reservoirUnitsLabel()})`);

        this.strengthLabel = ko.pureComputed(() => ` (${this.strength()}%)`);

        this.conversionFactor = ko.pureComputed(() => this.reservoirUnits() === UNITS.GALLONS ? 1 : 1 / GALLON_TO_LITER_FACTOR);

        this.tableLabel = ko.pureComputed(() => `Amount per ${this.reservoirSize()} ${this.reservoirUnits()} at ${this.strength()}%`);
    }
}