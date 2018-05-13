var https = require('https');

exports.handler = (event, context, callback) => {
    data = event.events[0];
    var replyToken = data.replyToken;
    var message = data.message;
    var txt = message.text;
    var jsonFile = require("./dialogue.json");
//    console.log(jsonFile)
//    txt.append("、とはどのような意味ですか？");
    var data = JSON.stringify({
       replyToken: replyToken,
       // ここがメッセージの内容
       messages: [
           jsonFile.dialogue
           /* おうむ返し
           {
               type: "text", 
               text: txt
           }
           */
           /* JSONを外部ファイル化
           {
                "type": "template",
                "altText": "テストメッセージ",
                "template": {
                    "type": "buttons",
                    "text": "メッセージありがとうございます！どんなことに興味がありますか？",
                    "defaultAction": {
                        "type": "uri",
                        "label": "Twitterをみる",
                        "uri": "https://twitter.com/ky_yk_d"
                    },
                "actions": [
                    {
                        "type": "uri",
                        "label": "ブログを読む",
                        "uri": "https://ky-yk-d.hatenablog.com/"
                    },
                    {
                        "type": "uri",
                            "label": "GitHubをみる",
                            "uri": "https://github.com/ky-yk-d"
                       },
                       {
                            "type": "uri",
                            "label": "Twitterをみる",
                            "uri": "https://twitter.com/ky_yk_d"
                       }
                    ]
                }
           } */
           
        ] 
    });
    var opts = {
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