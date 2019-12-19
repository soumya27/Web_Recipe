'use strict';
module.exports = function (app) {
    //Initialize models
    const users = require('./models/user');
    const recipes = require('./models/recipe');

    // public route
    app.route('/users', users);

    // private route
    app.route('/recipes', validateUser, recipes);
    app.get('/favicon.ico', function(req, res) {
        res.sendStatus(204);
    });
    function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
        res.json({status:"error", message: err.message, data:null});
        }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
        }
    });
    }

    //Initialize routes
    let appRoutes = require('./routes/route');
    appRoutes(app);
};