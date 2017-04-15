var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var params = {
  q: 'exploding kittens since:2011-11-11',
  count: 2
}

var user_params = {
  screen_name: '@mindfullycrafts',
  count: 10,
  include_rts: false
}

// T.get('search/tweets', params, gotData);
T.get('statuses/user_timeline', user_params, gotUserDatata);

function gotData(err, data, response) {
  var tweets = data.statuses;
  // show each text
  tweets.map(function (tweet) {
    console.log(tweet.text);
  })
}

function gotUserDatata(err, data, response) {
  var tweets = data;
  // show each text
  tweets.map(function (tweet) {
    console.log(tweet.text);
  })
}
