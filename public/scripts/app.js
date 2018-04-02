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
      $.flash('No tweet found!');
    } else if (textarea.length > 140) {
      $.flash('Your tweet is too lengthy.');
    } else {
      let data = $(this).serialize();
      $.post("/tweets", data, function (data) {
       //$('#old-tweets').empty(); can be used should all posts need to be loaded.
        loadFirstTweet(); //need to replace with loadTweets() instead;
      });
      $(this)[0].reset();
      $(this).find('.counter').text(140);
    }
  });
//like button event handler
  $('#old-tweets').on('click', '.fa-heart', function(ev) {
    let tweetID = $(this).attr('data-tweet-id');
    $.ajax ({
      url: `/tweets/${tweetID}`,
      method: "PUT",
      success: function () {
       $(this).toggleClass('liked');
      }
    });
  });

//load all the tweets in the database
  loadTweets();
//Toggle the compose new tweet form
  $('#nav-bar .compose').on('click', function () {
    $('.new-tweet').slideToggle('slow');
    $('.new-tweet textarea').focus();
  });

  $('#nav-bar .register').on('click', function () {
    $('main .register-form').slideToggle('slow');
  });

  $('#nav-bar .login').on('click', function () {
    $('main .login-form').slideToggle('slow');
  });

  //$('main .register-form').on('submit', function (){
    //ev.preventDefault();

  //});
});
//create the DOM structure for new tweets
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
  let $likes = $('<p>').text(`likes: ${tweet.like}`);
  let $like = $('<i>').addClass("fas fa-heart").attr("data-likes",tweet.like).attr('data-tweet-id',tweet._id);
  if (tweet.like_status === 'liked') {$like.addClass('liked')};
  let $share = $('<i>').addClass("fas fa-flag");
  let $flag = $('<i>').addClass("fas fa-retweet");
  $footer.append($likes);
  $footer.append($like);
  $footer.append($share);
  $footer.append($flag);
  $footer.append($timestamp);
  return $tweet;
}

function loadFirstTweet () {
  $.getJSON('http://localhost:8080/tweets', function (data) {
    return $('#old-tweets').prepend(createTweetElement(data[data.length - 1]));
  });
}

function loadTweets() {
   $.getJSON('http://localhost:8080/tweets', function (data) {
    return renderTweets(data);
  });
}

function renderTweets(tweets) {
  tweets.sort(function (tweetA, tweetB) {
    return tweetB.created_at - tweetA.created_at;
  });
  tweets.forEach(function (tweet) {
    return $('#old-tweets').append(createTweetElement(tweet));
  });
}

