var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Dishes = require('../models/dishes');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.find({})
    .populate('postedBy')
    .populate('dishes')
    .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(function (req, res, next) {

})



.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Favorites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = favoriteRouter;
