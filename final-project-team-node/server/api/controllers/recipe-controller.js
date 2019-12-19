'use strict';
const recipeService = require('../services/recipe-service');

/**
 * Returns a list of recipes in JSON based on the
 * search parameters.
 *
 * @param request
 * @param response
 */
exports.list = function (request, response) {
    const resolve = (recipe) => {
        response.status(200);
        response.json(recipe);
    };
    // console.log(request.params);
    let query = request.query;
    if(Object.keys(query).length === 0 ){
        recipeService.search({})
            .then(resolve)
            .catch(renderErrorResponse(response));
    }else{
        recipeService.get(query)
            .then(resolve)
            .catch(renderErrorResponse(response));
    }
};

/**
 * Creates a new recipe with the request JSON and
 * returns recipe JSON object.
 *
 * @param request
 * @param response
 */
exports.post = function (request, response) {
    const newRecipe = Object.assign({}, response.req.body);
    const resolve = (recipe) => {
        response.status(200);
        response.json(recipe);
    };
    recipeService.save(newRecipe)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// /**
//  * Returns a recipe in JSON.
//  *
//  * @param request
//  * @param response
//  */
// exports.get = function (request, response) {
//     const resolve = (recipe) => {
//         response.status(200);
//         response.json(recipe);
//     };
//     console.log(request.params);
//     recipeService.get(request.params.recipeID)
//         .then(resolve)
//         .catch(renderErrorResponse(response));
// };

/**
 * Updates and returns a recipe object in JSON.
 *
 * @param request
 * @param response
 */
exports.put = function (request, response) {
    const recipe = Object.assign({}, request.body);
    console.log("Inside recipe Put")
    console.log("Request body:", request.body);
    const resolve = (recipe) => {
        response.status(200);
        response.json(recipe);
    };
    recipe._id = request.params.recipeId;
    recipeService.update(recipe)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a recipe object.
 *
 * @param request
 * @param response
 */
exports.delete = function (request, response) {
    const resolve = (recipe) => {
        response.status(200);
        response.json({
            message: 'Recipe successfully deleted'
        });
    };
    recipeService.delete(request.params.recipeId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    return (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
};