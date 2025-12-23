/**
 * Represents a product that can be used in a recipe entry.
 */
export class Product {
    /**
     * Create a new Product instance.
     *
     * @param {Object} params - The initialization parameters.
     * @param {string} [params.key] - A unique identifier for the product. If omitted, a UUID is generated.
     * @param {string} [params.name] - The name of the product.
     * @param {string} [params.link] - A URL linking to the product (e.g., manufacturer or purchase page).
     */
    constructor({ key, name, link }) {
        /**
         * Unique identifier for the product.
         * @type {string}
         */
        this.key = key || crypto.randomUUID();

        /**
         * Name of the product.
         * @type {string}
         */
        this.name = name || '';

        /**
         * URL linking to more information about the product.
         * @type {string}
         */
        this.link = link || '';
    }
}
