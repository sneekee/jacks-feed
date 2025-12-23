/**
 * @typedef {import('./recipe-entry.js').RecipeEntry} RecipeEntry
 * If RecipeEntry is defined in another file, this import typedef
 * lets editors understand the type without creating a runtime dependency.
 */

/**
 * Represents a growth stage of a plant, including nutrient targets,
 * descriptive information, and a recipe of feed entries for this stage.
 */
export class PlantStage {
    /**
     * Create a new PlantStage instance.
     *
     * @param {Object} params - The initialization parameters.
     * @param {string} [params.key] - A unique identifier for the plant stage. If omitted, a UUID is generated.
     * @param {string} params.name - The name of the plant stage (e.g., "Vegetative", "Flowering").
     * @param {string} [params.description] - A human‑readable description of the stage.
     * @param {number} [params.targetEc] - Target electrical conductivity for this stage.
     * @param {number} [params.targetPpm500] - Target PPM (500 scale) for this stage.
     * @param {number} [params.targetPpm700] - Target PPM (700 scale) for this stage.
     * @param {RecipeEntry[]|RecipeEntry|null} [params.recipe] - A recipe or list of recipe entries for this stage.
     */
    constructor({ key, name, description, targetEc, targetPpm500, targetPpm700, recipe }) {
        /**
         * Unique identifier for the plant stage.
         * @type {string}
         */
        this.key = key || crypto.randomUUID();

        /**
         * Name of the plant stage.
         * @type {string}
         */
        this.name = name || '';

        /**
         * Description of the plant stage.
         * @type {string}
         */
        this.description = description || '';

        /**
         * Target electrical conductivity.
         * @type {number}
         */
        this.targetEc = targetEc || 0;

        /**
         * Target PPM using the 500 scale.
         * @type {number}
         */
        this.targetPpm500 = targetPpm500 || 0;

        /**
         * Target PPM using the 700 scale.
         * @type {number}
         */
        this.targetPpm700 = targetPpm700 || 0;

        /**
         * Recipe entries associated with this stage.
         * Always stored as an array.
         * @type {RecipeEntry[]}
         */
        this.recipe =
            recipe == null
                ? []
                : Array.isArray(recipe)
                    ? recipe
                    : [recipe];
    }
}
