/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
//   const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    let $header = $('<header>').addClass('tweet-header');
    $tweet.append($header);
    let $avatars = $('<img>').addClass('avatars').attr('src',tweet.user.avatars.small);
    let $name = $('<h2>').addClass('fullname').text(tweet.user.name);
    let $handle = $('<h5>').addClass('username').text(tweet.user.handle);
    $header.append($avatars);
    $header.append($name);
    $header.append($handle);
    let $content = $('<p>').addClass('content').text(tweet.content.text);
    $tweet.append($content);
    let $footer = $('<footer>')
    $tweet.append($footer);
    let $timestamp = $('<p>').addClass('timestamp').text(tweet.created_at);
    let $like = $('<img>').addClass('like').attr('src',"/images/likebottons.png");
    $footer.append($timestamp);
    $footer.append($like)
    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.sort(function (tweetA, tweetB) {
      return tweetB.created_at - tweetA.created_at;
    })
    tweets.forEach(function (tweet) {
      return $('#old-tweets').append(createTweetElement(tweet));
    })
  }

  $('.new-tweet form').on('submit', function(ev) {
    ev.preventDefault();
    let textarea = $(this).find('textarea').val();
    if (textarea === "") {
      $.flash('No tweet found!')
    } else if (textarea.length > 140) {
      $.flash('Your tweet is too lengthy.');
    } else {
      let data = $(this).serialize();
      $.post("/tweets", data, function (data) {
        // TODO: clear out existing tweets
        $('#old-tweets').empty();
        loadTweets();
      })
    }
  })

  function loadTweets() {
    $.getJSON('http://localhost:8080/tweets', function (data) {
      return renderTweets(data);
    })
  }

  // renderTweets(data);
  loadTweets();

  $('#nav-bar button').on('click', function () {
    $('.new-tweet').slideToggle('slow');
    $('.new-tweet textarea').focus();
  })

















})
