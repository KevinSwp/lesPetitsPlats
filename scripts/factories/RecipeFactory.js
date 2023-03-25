/**
 * Import object from file
 */
import Recipe from "../models/Recipe.js";

/**
 * Export
 */
export const RECIPE_TYPES = {JSON_V1 : "JSON_V1"}

/**
 * Get data type
 */
export default class RecipeFactory {
    constructor(data, type) {
        if (type === RECIPE_TYPES.JSON_V1) {
            return new Recipe(data);
        }

        else {
            throw "Unknown type format";
        }
    }
}