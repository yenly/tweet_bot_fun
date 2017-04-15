console.log('Bot started!');

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

// var params = {
//   q: 'exploding kittens since:2011-11-11',
//   count: 2
// }
//
// T.get('search/tweets', params, gotData);
//
// function gotData(err, data, response) {
//   var tweets = data.statuses;
//   // show each text
//   tweets.map(function (tweet) {
//     console.log(tweet.text);
//   })
// }

// tell it to run every 20secs
// setInterval(tweetIt, 1000*20)

// tweetIt('I love purr programming! #catwhocodes');
//
function tweetIt(message) {
  var tweet = {
    status: message
  }

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("Boop!");
    } else {
      console.log("Sent!")
    }
  }
}

// set up a user stream
var stream = T.stream('user');

// anytime someone follows me
// stream.on('follow', followed);

function followed(eventMsg) {
  console.log("Follow event");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt('@' + screenName + ': Thank you for the follow!');
}

stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
  // var fs = require('fs');
  // var json = JSON.stringify(eventMsg, null, 2);
  // fs.writeFile("tweet.json", json);
  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var from = eventMsg.user.screen_name;

  console.log(replyto + ' ' + from);

  if (replyto === 'HobbesPlay') {
    var newTweet = '@' + from + ' Yasss! Now feed me please. :)';
    tweetIt(newTweet);
  }
}
