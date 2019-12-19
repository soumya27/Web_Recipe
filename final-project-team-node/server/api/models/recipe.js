'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
    name: String,
    amount: String
});

const instructionsSchema = new Schema ({
    steps: String
})

const userCommentSchema = new Schema({
    name: String,
    emailAddress: String,
    comment: String,
    rating: String,
});

/**
 * Mongoose schema for recipe object.
 */
let recipeSchema = new Schema({
    /**
     * Title of the recipe item.
     */
    title: {
        type: String,
        required: "Title is required"
    },
    /**
     * serving of the recipe item.
     */
    serving: {
        type: String,
        default: "Not mentioned"
    },
    /**
     * ingredients required of the recipe item.
     */
    ingredients : {
        type: [ingredientsSchema],
        required: "Ingredients are required"
    },
    /**
     * steps of the recipe item
     */
    steps:{
        type: [instructionsSchema],
        required: "Steps are required"
    },
    /**
     *  User who created the recipe item
     */
    author: {
        type: String,
        required: "author is required"
    },
    /**
     *  Calories in kCal for recipe item
     */
    calories:{
        type: String,
        default: "Not mentioned"
    },
    /**
     *  preparation time for recipe item
     */
    time: {
        type: String,
        default: "Not mentioned"
    },
    /**
     *  Category for recipe item
     */
    category: {
        type: String,
        required: "category is required"
    },
    /**
     *  URL of the image for recipe item
     */
    image: {
        type: String
    },
    /**
     *  URL of the video for recipe item
     */
    video:{
        type: String
    },
    /**
     * Creation Date
     */
    createdDate: {
        type: Date,
        default: Date.now
    },
    /**
     * Users who commented on the recipe.
     */
    userComments : {
        type: [userCommentSchema],
    }

}, {
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
recipeSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ingredientsSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
recipeSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('recipes', recipeSchema);