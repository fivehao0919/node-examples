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

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    var dishId = req.body._id;
    delete req.body._id ;
    Dishes.findOne({"_id": dishId}, function (err, dish) {
        if (dish) {
                Favorites.findOne({"postedBy": req.decoded._doc._id}, function (err, favorite) {
                if (err) throw err;
                if (!favorite) {
                    Favorites.create(req.body, function (err, favorite) {

                        if (err) throw err;
                        favorite.postedBy = req.decoded._doc._id;
                        favorite.dishes.push(dishId);
                        favorite.save(function (err, favorite) {
                            if (err) throw err;
                            console.log('Updated favorites!');
                            res.json(favorite);
                            return;
                        });
                    });
                } else {
                    for (x in favorite.dishes)
                    {
                        if (favorite.dishes[x] == dishId) {
                            res.json('dish already in!');
                            return;
                        }
                    }
                    favorite.dishes.push(dishId);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        console.log('Updated favorites!');
                        res.json(favorite);
                        return;
                    });
                }
            })
        } else {
            res.json('dish not found!');
            return;
        }
    })
})

favoriteRouter.route('/')
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Favorites.remove({"postedBy": req.decoded._doc._id}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


favoriteRouter.route('/:dishObjectId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({"postedBy": req.decoded._doc._id}, function (err, favorite) {
        for (x in favorite.dishes) {
            if (favorite.dishes[x] == req.params.dishObjectId) {
                favorite.dishes.splice(x,1);
            }
        }
        favorite.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = favoriteRouter;
