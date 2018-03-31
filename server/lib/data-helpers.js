"use strict";

// Simulates the kind of delay we see with network or filesystem operations
//const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().toArray((err, results) => {
        if (err) {
          return callback(true);
        } else {
          const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          callback(null, results.sort(sortNewestFirst));
        }
      })
    },
    //like a tweet
    likeTweet: function (id, callback) {
      let filter = { _id: ObjectID(id) };
      db.collection('tweets').findOne(filter, function (err, result) {
        console.log(result);
        console.log(result.like_status);
        if (result.like_status === 'unliked' || result.like_status === undefined) {
          db.collection('tweets').findOneAndUpdate(filter, {$set:{"like_status":'liked'}});
          db.collection('tweets').findOneAndUpdate(filter, {$inc:{"like":1}}, (err, result) => {
            if (err) {
              return callback(err);
            } else {
              callback(null, result);
            }
          })
        } else {
          db.collection('tweets').findOneAndUpdate(filter, {$set:{"like_status":'unliked'}});
          db.collection('tweets').findOneAndUpdate(filter, {$inc:{"like": -1}}, (err, result) => {
            if (err) {
              return callback(err);
            } else {
              callback(null, result);
            }
          })
        }

      })
    }
  };
};

