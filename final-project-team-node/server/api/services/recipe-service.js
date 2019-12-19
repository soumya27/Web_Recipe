'use strict';
const mongoose      = require('mongoose'),
      recipeModel   = mongoose.model('recipes');

/**
 * Returns an array of recipes matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = function (params) {
    return recipeModel.find(params).exec();
};

/**
 * Saves and returns the new recipe.
 *
 * @param {Object} recipe {recipe object}
 */
exports.save = function (recipe) {
    const newRecipe = new recipeModel(recipe);
    return newRecipe.save();
};

/**
 * Returns the recipe matching the query.
 *
 * @param {string} query
 */
exports.get = function (query) {
    return recipeModel.find(query);
};

/**
 * Updates and returns the recipe object.
 *
 * @param {Object} recipe {recipe object}
 */
exports.update = function (recipe) {
    console.log("Update service");
    return recipeModel.findOneAndUpdate({_id: recipe._id}, recipe, {new: true}).exec();
};

/**
 * Deletes the recipe object matching the id.
 *
 * @param {string} recipeId {Id of the recipe object}
 */
exports.delete = function (recipeId) {
    return recipeModel.remove({_id: recipeId});
};