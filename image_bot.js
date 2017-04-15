var Twit = require('twit');
var config = require('./config');
var fs = require('fs');

var T = new Twit(config);

tweetImage()

function tweetImage() {
  var filename = 'images/IMG_6869.JPG';
  var params = {
    encoding: 'base64'
  }
  var b64content = fs.readFileSync(filename, params);

  T.post('media/upload', { media_data: b64content }, uploaded);

  function uploaded(err, data, response) {
    // This is where I will tweet
    var id = data.media_id_string;

    var tweet = {
      status: 'Me cozying up to my human BFF',
      media_ids: [id]
    }
    T.post('statuses/update', tweet, tweeted);
  }

  function tweeted(err, data, response) {
    if (err) {
      console.log("Boop!");
    } else {
      console.log("Sent!")
    }
  }
}
