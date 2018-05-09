var https = require('https');

exports.handler = (event, context, callback) => {
    data = event.events[0];
    var replyToken = data.replyToken;
    var message = data.message;
    var txt = message.text;
//    txt.append("、とはどのような意味ですか？");
    var data = JSON.stringify({
       replyToken: replyToken,
       messages: [
           {
               type: "text", 
               text: txt
           }
        ]
    });
    opts = {
        hostname: 'api.line.me',
        path: '/v2/bot/message/reply',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Content-Length": Buffer.byteLength(data),
            "Authorization": "Bearer " + process.env.CHANNEL_ACCESS_TOKEN
        },
        method: 'POST',
    };

    var req = https.request(opts, function(res) {
        res.on('data', function(res) {
            console.log(res.toString());
        }).on('error', function(e) {
            console.log('ERROR: ' + e.stack);
        });
    });
    callback(null, data);
    req.write(data);
    req.end();

};