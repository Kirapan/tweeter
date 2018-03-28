/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
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
       //$('#old-tweets').empty();
        loadFirstTweet();
      })
      $(this)[0].reset();
    }
  })

  loadTweets();

  $('#nav-bar button').on('click', function () {
    $('.new-tweet').slideToggle('slow');
    $('.new-tweet textarea').focus();
  })
})

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

function loadFirstTweet () {
  $.getJSON('http://localhost:8080/tweets', function (data) {
    return $('#old-tweets').prepend(createTweetElement(data[data.length - 1]));
  })
}

function loadTweets() {
   $.getJSON('http://localhost:8080/tweets', function (data) {
    return renderTweets(data);
  })
}

function renderTweets(tweets) {
  tweets.sort(function (tweetA, tweetB) {
    return tweetB.created_at - tweetA.created_at;
  })
  tweets.forEach(function (tweet) {
    return $('#old-tweets').append(createTweetElement(tweet));
  })
}

