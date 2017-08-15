var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connection correctly to server");

    Dishes.create({
        "name": "Uthapizza",
        "image": "images/uthapizza.png",
        "category": "mains",
        "price": "4.99",
        "description": "A unique . . .",
        "comments": [
            {
                "rating": 5,
                "comment": "Imagine all the eatables, living in conFusion!",
                "author": "John Lemon"
            },
            {
                "rating": 4,
                "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                "author": "Paul McVites"
            }
        ]
}, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);
        db.collection('dishes').drop(function () {
                        db.close();
                    });
    });

    Promotions.create({
        "name": "Weekend Grand Buffet",
        "image": "images/buffet.png",
        "label": "New",
        "price": "19.99",
        "description": "Featuring . . ."
}, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promotion);
        db.collection('promotions').drop(function () {
                        db.close();
                    });
    });

    Leaders.create({
        "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."
}, function (err, leader) {
        if (err) throw err;
        console.log('leadership created!');
        console.log(leader);
        db.collection('leaders').drop(function () {
                        db.close();
                    });
    });
});


