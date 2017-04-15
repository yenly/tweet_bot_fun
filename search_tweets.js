var Twit = require('twit');
var config = require('./config');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/V3');
var PersonalityInsighsV3 = require('watson-developer-cloud/personality-insights/v3');
var TA_config = require('./watson_config');
var PT_config = require('./personality_config');

var tone_analyzer = new ToneAnalyzerV3(TA_config);
var personality_insights = new PersonalityInsighsV3(PT_config);

var T = new Twit(config);

var params = {
  q: 'exploding kittens since:2011-11-11',
  count: 2
}

var user_params = {
  screen_name: '@mindfullycrafts',
  count: 100,
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
  var allTweets = tweets.map(function (tweet) {
    return tweet.text;
  })
  var Text = allTweets.join();
  var inputText = {
    text: Text
  }

  tone_analyzer.tone(inputText, getTone);

  function getTone(err, tone) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(tone, null, 2));
  }

  personality_insights.profile(inputText, getData);

  function getData(err, response) {
    if (err)
      console.log('error', err);
    else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
}
