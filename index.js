// ベースはQiita等で様々な人が公開しているソースコード
// （例） https://qiita.com/tenn25/items/5456f9eb6ac92ff09dd9
let https = require('https');

/**
 * Lambda実行時に呼び出されるハンドラ
 * @param {} event イベント
 * @param {} context コンテキスト
 * @param {} callback コールバック関数（正体は未確認）
 */
exports.handler = (event, context, callback) => {
    let messageObj;
    let replyToken;
    let jsonFile;
    let opts;
    let req;
    let data;
    let replyData;
    data = event.events[0];
    replyToken = data.replyToken;
// LINEでユーザから送られたテキストを取得
// メッセージオブジェクトを記述したJSONファイルを読み込む
// https://developers.line.me/ja/docs/messaging-api/reference/#anchor-e65d8a1fb213489f6475b06ad10f66b7b30b0072
    jsonFile = require("./dialogue.json");
// 入力に応じたメッサージの選択
    messageObj = getMessageObj(data, jsonFile);
// 返すデータを作成する
    console.log('データ作成');
    replyData = JSON.stringify({
       replyToken: replyToken,
       messages: [
           messageObj
        ] 
    });
    console.log(replyData);

// この辺も整理したい（意味すらよくわかっていないのでそこから）
    opts = {
        hostname: 'api.line.me',
        path: '/v2/bot/message/reply',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Content-Length": Buffer.byteLength(replyData),
            "Authorization": "Bearer " + process.env.CHANNEL_ACCESS_TOKEN
        },
        method: 'POST',
    };

    req = https.request(opts, function(res) {
        res.on('replyData', function(res) {
            console.log(res.toString());
        }).on('error', function(e) {
            console.log('ERROR: ' + e.stack);
        });
    });
    callback(null, replyData);
    req.write(replyData);
    req.end();
};

/**
 * 入力されたデータに応じて、返すメッセージを生成する関数
 * @param {} data 入力されたデータ
 * @param {} jsonFile 外部ファイルから読み込んだJSON形式のデータ
 * @return {} メッセージオブジェクト
 * @author こまど（ky_yk_d）
 */
let getMessageObj = (data, jsonFile)=> {
    switch (data.type){
        case 'message':
            console.log('メッセージの場合');
            if (data.message.type == 'text'){
                // テキストメッセージの場合、入力された文字列に応じて分岐
                if (data.message.text == '住所') {
                    return jsonFile.dialogue2;
                } else {
                    return jsonFile.dialogue1;
                }
            } else if (data.message.type == "image"){
                console.log('画像メッセージ');
                return jsonFile.imageMessage;
            } else {
                // テキストメッセージ以外の場合
                console.log('テキスト以外のメッセージが入力された');
                return jsonFile.otherMessageType;
            }
        case 'postback':
            console.log('postbackの場合');
            return jsonFile[data.postback.data];
        default :
            console.log('それ以外の場合');
            console.log(data);
            return jsonFile.otherEventType;
    }
};