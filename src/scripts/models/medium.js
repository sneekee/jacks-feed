/**
 * @typedef {import('./plant-stage.js').PlantStage} PlantStage
 * If PlantStage is defined in another file, this import typedef
 * lets editors understand the type without creating a runtime dependency.
 */

/**
 * Represents a medium within a feed schedule.
 */
export class Medium {
    /**
     * Create a new Medium instance.
     *
     * @param {Object} params - The initialization parameters.
     * @param {string} [params.key] - A unique identifier for the medium. If omitted, a UUID is generated.
     * @param {string} [params.name] - A human‑readable name for the medium.
     * @param {string} [params.description] - A description of the medium.
     * @param {string[]} [params.feedGuidLink] - Link to the official feed guid from Jacks.
     * @param {PlantStage[]} [params.stages] - An array of PlantStage instances associated with this medium.
     */
    constructor({ key, name, description, feedGuidLink, stages}) {
        /**
         * Unique identifier for the medium.
         * @type {string}
         */
        this.key = key || crypto.randomUUID();

        /**
         * Human‑readable name for the medium.
         * @type {string}
         */
        this.name = name || '';

        /**
         * Description of the medium.
         * @type {string}
         */
        this.description = description || '';

        /**
         * Link to the official feed guid from Jacks.
         * @type {string}
         */
        this.feedGuidLink = feedGuidLink || '';

        /**
         * Stages associated with this medium.
         * @type {PlantStage[]}
         */
        this.stages = stages == null ? [] : Array.isArray(stages) ? stages : [stages];
    }
}
