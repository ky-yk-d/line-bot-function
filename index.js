// ベースはQiita等で様々な人が公開しているソースコード
// （例） https://qiita.com/tenn25/items/5456f9eb6ac92ff09dd9
const Message = require('./src/message');
const Utils = require('./src/utils');

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
    messageObj = Message.getMessageObj(data,jsonFile);
// 返すデータを作成する
    console.log('データ作成');
    replyData = JSON.stringify({
       replyToken: replyToken,
       messages: [
           messageObj
        ] 
    });
    console.log(replyData);
    req = Utils.generateRequest(replyData);
    callback(null, replyData);
    req.write(replyData);
    req.end();
};