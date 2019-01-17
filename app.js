require('dotenv').config(); //Allows access to env variables inside .env file
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');


// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'reddit-SenecaCollege-bot-first-app', //TODO: Update
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);


// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'all', //Subreddit i want to GET from
    results: 25
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
    console.log(comment);
});
  

//TODO: Example usage
if (comment.body === ':(') {
    comment.reply(':)');
}
