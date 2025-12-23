/**
 * Centralized typedefs for all domain model classes.
 * These typedefs allow editors and tooling to understand
 * cross‑referenced types without creating runtime dependencies.
 */

/**
 * @typedef {import('./feed-schedule.js').FeedSchedule} FeedSchedule
 * Represents a schedule configuration containing mediums.
 */

/**
 * @typedef {import('./medium.js').Medium} Medium
 * Represents a medium containing plant stages.
 */

/**
 * @typedef {import('./plant-stage.js').PlantStage} PlantStage
 * Represents a plant growth stage with nutrient targets and a recipe.
 */

/**
 * @typedef {import('./recipe-entry.js').RecipeEntry} RecipeEntry
 * Represents a single recipe entry used in a plant stage.
 */

/**
 * @typedef {import('./product.js').Product} Product
 * Represents a product used in recipe entries.
 */
