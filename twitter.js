let Twit = require("twit");
require("dotenv").config();

var tweetText = '';
const https = require('https');

https.get(`https://${process.env.HOST}`, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    tweetText = JSON.parse(data).message;
    console.log(tweetText);

    T.post(
      "statuses/update",
      { status: tweetText + " #boardgames" },
      (err, data, response) => {
        console.log(data);
      }
    );
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});


const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


