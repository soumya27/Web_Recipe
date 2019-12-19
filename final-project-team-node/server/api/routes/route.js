'use strict';
module.exports = function (app) {
    const userController = require('../controllers/user-controller');
    const recipeController = require('../controllers/recipe-controller');

    // User routes for search and create.
    app.route('/users')
        .get(userController.list)
        .post(userController.post);
        
    // User routes for forget password
    app.route('/users/forget-password')
        .post(userController.resetPassword);

    // User routes for forget password
    app.route('/users/validate-password')
        .post(userController.ValidPasswordToken);    

    // User routes for get, update and delete.
    app.route('/users/:username')
        .get(userController.get)
        .post(userController.authenticate);

    // // User routes for get, update and delete.
    app.route('/users/:userId')
        .put(userController.put)
        .delete(userController.delete);

    // Recipe routes for search and create.
    app.route('/recipes')
        // .get(recipeController.get)
        .get(recipeController.list)
        .post(recipeController.post);

    // User routes for update and delete.
    app.route('/recipes/:recipeId')
        .put(recipeController.put)
        .delete(recipeController.delete);

};