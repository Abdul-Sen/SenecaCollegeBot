require('dotenv').config();
let Snooper = require('reddit-snooper')
snooper = new Snooper(
    {
        // credential information is not needed for snooper.watcher
        username: process.env.REDDIT_USER,
        password: process.env.REDDIT_PASS,
        app_id: process.env.CLIENT_ID,
        api_secret: process.env.CLIENT_SECRET,
        user_agent: 'For r/Seneca moderation',

        automatic_retries: true, // automatically handles condition when reddit says 'you are doing this too much'
        api_requests_per_minute: 60 // api requests will be spread out in order to play nicely with Reddit
    })

/*
        1- Watch for new comments
        2- see if user is one of the mods
        3- see if comment is about rules
        4- find comment or thread ID
        5- reply
*/
console.log(process.env.REDDIT_USER, process.env.REDDIT_PASS, process.env.CLIENT_ID, process.env.CLIENT_SECRET);

snooper.watcher.getCommentWatcher('seneca') // blank argument or 'all' looks at the entire website
    .on('comment', function (comment) {
        if (comment.data.author == process.env.MOD1) {
            //check if comment starts with '!'
            console.log(`working...`)
            if ((comment.data.body.toUpperCase()).includes('!RULE')) {
                console.log(`this is about rules!!!!` + comment.data.body)
                
            }
        }
        // comment is a object containing all comment data
        console.log('comment was posted by: ' + comment.data.author)
        console.log('contents ' + comment.data.body)
        // or
        console.log(comment)
    })
    .on('error', console.error);

function replyThread(url,message)
{
    snooper.api.post(url,)
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //     snooper.watcher.getPostWatcher('seneca') // blank argument or 'all' looks at the entire website
    // .on('post', function(post) {
    //     // comment is a object containing all comment data
    //     console.log('post was posted by: ' + post.data.author)
    //     console.log(post)
    // })
    // .on('error', console.error)
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //watch for comments