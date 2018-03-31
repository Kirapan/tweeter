  "use strict";

const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const tweetsRoutes  = express.Router();
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');
const app           = express();
app.use(methodOverride('_method'));
app.use(cookieSession({
  name: 'session',
  keys: ['TwEeTeRpRoJeCt'],
  maxAge: 24 * 60 * 60 * 1000
}));

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      like: 0,
      like_status: "unliked"
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });
//endpoint for liking the tweets
  tweetsRoutes.put("/:id", function(req, res) {
      DataHelpers.likeTweet(req.params.id, (err, tweets) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).send();
        }
      });
    });

    //}
  return tweetsRoutes;
}
