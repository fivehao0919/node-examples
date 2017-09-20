var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/favorites');
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

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.create(req.body, function (err, favorite) {
        if (err) throw err;
        console.log('Favorites created!');
        var id = favorite._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the favorite with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Favorites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = favoriteRouter;
