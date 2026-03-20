import ko from "knockout";
import { UNITS, GALLON_TO_LITER_FACTOR } from "../data/constants.js";

export const ReservoirScales = {
    gallons: [
        { key: '1-20',    label: '1–20',    min: 1,   max: 20,  step: 1  },
        { key: '20-40',   label: '20–40',   min: 20,  max: 40,  step: 1  },
        { key: '40-60',   label: '40–60',   min: 40,  max: 60,  step: 1  },
        { key: '60-80',   label: '60–80',   min: 60,  max: 80,  step: 1  },
    ],
    liters: [
        { key: '1-20',    label: '1–20',    min: 1,   max: 20,  step: 1  },
        { key: '20-100',  label: '20–100',  min: 20,  max: 100, step: 5  },
        { key: '100-200', label: '100–200', min: 100, max: 200, step: 10 },
        { key: '200-300', label: '200–300', min: 200, max: 300, step: 10 },
    ]
};

export class Options {
    constructor({reservoirSize, reservoirUnits, strength}){
        this.reservoirSize = ko.observable(reservoirSize);
        this.reservoirUnits = ko.observable(reservoirUnits);
        this.strength = ko.observable(strength);

        this.reservoirUnitsLabel = ko.pureComputed(() => this.reservoirUnits() === UNITS.LITERS ? "Liters" : "Gallons");

        this.reservoirLabel = ko.pureComputed(() => ` (${this.reservoirSize()} ${this.reservoirUnitsLabel()})`);

        this.strengthLabel = ko.pureComputed(() => ` (${this.strength()}%)`);

        this.conversionFactor = ko.pureComputed(() => this.reservoirUnits() === UNITS.GALLONS ? 1 : 1 / GALLON_TO_LITER_FACTOR);

        this.tableLabel = ko.pureComputed(() => `Amount per ${this.reservoirSize()} ${this.reservoirUnits()} at ${this.strength()}%`);
    }
}