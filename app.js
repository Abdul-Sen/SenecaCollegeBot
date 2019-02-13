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
        api_requests_per_minute: 60 // api requests will be spread out in order to play nicely with Reddit rules
    })

snooper.watcher.getCommentWatcher('seneca') //watching r/Seneca
    .on('comment', function (comment) {
        if (comment.data.author == process.env.MOD1 || comment.data.author == process.env.MOD2) { //looking out for mod comments
            if ((comment.data.body.toUpperCase()).includes('!RULE')) { //seeing if it contains this key
                console.log(`comment body: `, comment.data.body)

                switch((comment.data.body).toUpperCase()) { //display rules
                    case "!RULE1":
                            reply(comment.data.link_id,`Hi ${comment.data.link_author},This page is not officially 
                            maintained by Seneca staff, therefore any questions regarding costs,
                            registration, courses... etc are better off answered by contacting admissions.
                            416.491.5050 ext. 22840`);
                      break;
                    case "!RULE2":
                            reply(comment.data.link_id,"This post was removed for asking questions that should be asked to Seneca Staff");
                      break;
                    case "!RULE3":
                    reply(comment.data.link_id,`Removed for breaking rule 3: No questions about programs and courses`);
                    break;
                    case "!RULE4":
                    reply(comment.data.link_id,`Hi ${comment.data.link_author}, your post was removed for breaking rule 4: No ads for services allowed.\n\nBleep Boop. I am a bot, please don't downvote me :c`);
                    break;
                    default:
                      // code block
                  }
            }
        }
    })
    .on('error', console.error);


function reply(uniqueID,content) { //reply to id provided
    snooper.api.post("/api/comment", {
        api_type: "json",
        text:     content,
        thing_id: uniqueID
    }, function (err, statusCode, data) {
        if (!err) console.log(`just replied to thread`)
    });
}