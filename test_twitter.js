var dotenv = require('dotenv').config();
var Twitter = require('twitter');

var twClient = new Twitter({
  consumer_key: process.env.REACT_APP_TW_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_TW_CONSUMER_SECRET,
  access_token_key: process.env.REACT_APP_TW_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.REACT_APP_TW_ACCESS_TOKEN_SECRET
});

// var params = {screen_name: 'nodejs'};
var user_params = {
  screen_name: '@mindfullycrafts',
  count: 100,
  include_rts: false
}
twClient.get('statuses/user_timeline', user_params, function(error, tweets, response) {
  console.log(tweets);
});
