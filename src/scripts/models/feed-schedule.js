/**
 * @typedef {import('./medium.js').Medium} Medium
 * If Medium is defined in another file, this import typedef
 * lets editors understand the type without creating a runtime dependency.
 */

/**
 * Represents a schedule configuration for a feed.
 */
export class FeedSchedule {
    /**
     * Create a new FeedSchedule instance.
     *
     * @param {Object} params - The initialization parameters.
     * @param {string} [params.key] - A unique identifier for the schedule. If omitted, a UUID is generated.
     * @param {string} [params.name] - A human‑readable name for the schedule.
     * @param {Medium[]} [params.mediums] - An array of Medium instances associated with this schedule.
     */
    constructor({ key, name, mediums }) {
        /**
         * Unique identifier for the schedule.
         * @type {string}
         */
        this.key = key || crypto.randomUUID();

        /**
         * Human‑readable name for the schedule.
         * @type {string}
         */
        this.name = name || '';

        /**
         * Mediums associated with this schedule.
         * @type {Medium[]}
         */
        this.mediums = mediums == null ? [] : Array.isArray(mediums) ? mediums : [mediums];
    }
}
