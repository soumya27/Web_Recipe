'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const saltRounds = 10;

/**
 * Mongoose schema for user object.
 */
let userSchema = new Schema({
    /**
     * Username for user
     */
    username: {
        type: String,
        required: "username is required"
    },
    /**
     * Password for user
     */
    password: {
        type: String,
        required: "password is required"
    },
    /**
     *  First name for user.
     */
    firstname: {
        type: String,
        required: "name is required"
    },
    /**
     *  Last name for user.
     */
    lastname: {
        type: String,
        required: "last name is required"
    },
    /**
     * User gender.
     */
    gender: {
        type: String
    }

}, {
    versionKey: false
}, {
    collection: 'Restaurant'
});

// Duplicate the id field as mongoose returns _id field instead of id.
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// hash user password before saving into database
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('user', userSchema);