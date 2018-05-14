// ベースはQiita等で様々な人が公開しているソースコード
// （例） https://qiita.com/tenn25/items/5456f9eb6ac92ff09dd9
var https = require('https');

exports.handler = (event, context, callback) => {
    data = event.events[0];
    var replyToken = data.replyToken;
    var message = data.message;
// LINEでユーザから送られたテキストを取得
    var txt = message.text;
// メッセージオブジェクトを記述したJSONファイルを読み込む
// https://developers.line.me/ja/docs/messaging-api/reference/#anchor-e65d8a1fb213489f6475b06ad10f66b7b30b0072
    var jsonFile = require("./dialogue.json");
// 入力に応じたメッサージの選択（関数でくくり出すべき）
    var messageObj;
    if (txt == '住所') {
        messageObj = jsonFile.dialogue2;
    } else {
        messageObj = jsonFile.dialogue;
    }
// 返すデータを作成する
    var data = JSON.stringify({
       replyToken: replyToken,
       messages: [
           messageObj
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