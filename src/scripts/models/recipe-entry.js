/**
 * @typedef {import('./product.js').Product} Product
 * If Product is defined in another file, this import typedef
 * lets editors understand the type without creating a runtime dependency.
 */

/**
 * Represents a single recipe entry used in a plant stage,
 * defining how much of a product contributes to the nutrient mix.
 */
export class RecipeEntry {
    /**
     * Create a new RecipeEntry instance.
     *
     * @param {Object} params - The initialization parameters.
     * @param {string} [params.key] - A unique identifier for the recipe entry. If omitted, a UUID is generated.
     * @param {Product|string} params.product - The product used in this recipe entry.
     * @param {number} [params.baseGrams] - Base grams of the product used in the recipe.
     * @param {number} [params.basePPM] - Base PPM contribution of the product.
     * @param {number} [params.baseMN] - Base millinormal (mN) contribution of the product.
     */
    constructor({ key, product, baseGrams, basePPM, baseMN }) {
        /**
         * Unique identifier for the recipe entry.
         * @type {string}
         */
        this.key = key || crypto.randomUUID();

        /**
         * The product used in this recipe entry.
         * Can be a Product instance or a product name string.
         * @type {Product|string}
         */
        this.product = product;

        /**
         * Base grams of the product used.
         * @type {number}
         */
        this.baseGrams = baseGrams || 0;

        /**
         * Base PPM contribution of the product.
         * @type {number}
         */
        this.basePPM = basePPM || 0;

        /**
         * Base millinormal (mN) contribution of the product.
         * @type {number}
         */
        this.baseMN = baseMN || 0;
    }
}
