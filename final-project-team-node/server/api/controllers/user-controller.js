'use strict';
const userService = require('../services/user-service');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

/**
 * Returns a list of users in JSON based on the
 * search parameters.
 *
 * @param request
 * @param response
 */
exports.list = function (request, response) {
    const resolve = (users) => {
        response.status(200);
        response.json(users);
    };
    userService.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new user with the request JSON and
 * returns user JSON object.
 *
 * @param request
 * @param response
 */
exports.post = function (request, response) {
    console.log('inside post user controller');
    const newUser = Object.assign({}, request.body);
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
    userService.save(newUser)
        .then(resolve)
        .catch(renderErrorResponse(response));   
};

/**
 * Resets Password
 * returns user JSON object.
 *
 * @param request
 * @param response
 */
exports.resetPassword = function(request, response){
    console.log("Inside reset pass user controller");
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
    userService.ResetPassword(request, response)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Validate Token and create new Password
 * returns user JSON object.
 *
 * @param request
 * @param response
 */
exports.ValidPasswordToken = function(request, response){
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
    userService.ValidPasswordToken(request, response)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Authenticate User
 * returns user JSON object.
 *
 * @param request
 * @param response
 */
exports.authenticate = function(request, response){
    console.log('inside authenticate');
    const userInfo = Object.assign({}, request.body);
    let uuid = uuidv1();
    var secretkey = uuid;
    // console.log(userInfo);
    userModel.findOne({username:request.body.username}, function(err, userInfo){
        // console.log(request.body.username);
        console.log(request.body.password);
        console.log(userInfo.password);
        if (err) {
         next(err);
        } else {
            if(bcrypt.compareSync(request.body.password, userInfo.password)) {
                console.log(request.app);
                console.log('inside bcrypt if');
                const token = jwt.sign({id: userInfo._id}, secretkey, { expiresIn: '1h' });
                console.log(token);
                response.json({user: userInfo, token:token});
            } else{
                response.json({status:"error", message: "Invalid email/password!!!", data:null});
            }
        }
    });
};

/**
 * Returns a user in JSON.
 *
 * @param request
 * @param response
 */
exports.get = function (request, response) {
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
    userService.get(request.params.userId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};


/**
 * Search a user by username and return a user in JSON.
 *
 * @param request
 * @param response
 */
exports.get = function (request, response) {
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
    userService.get(request.params.username)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a user object in JSON.
 *
 * @param request
 * @param response
 */
exports.put = function (request, response) {
    const user = Object.assign({}, request.body);
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
    user._id = request.params.userId;
    userService.update(user)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a user object.
 *
 * @param request
 * @param response
 */
exports.delete = function (request, response) {
    const resolve = (user) => {
        response.status(200);
        response.json({
            message: 'User successfully deleted'
        });
    };
    userService.delete(request.params.userId)
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