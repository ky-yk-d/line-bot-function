// ベースはQiita等で様々な人が公開しているソースコード
// （例） https://qiita.com/tenn25/items/5456f9eb6ac92ff09dd9
let https = require('https');
const Message = require('./src/message');

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
    const opts = {
        hostname: 'api.line.me',
        path: '/v2/bot/message/reply',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Content-Length": Buffer.byteLength(replyData),
          "Authorization": "Bearer " + process.env.CHANNEL_ACCESS_TOKEN
        },
        method: 'POST',
    };
    console.log('---START---');
    let promise = sendRequest(opts, replyData).then((res)=>{
        console.log('---DONE---');
        console.log('typeof:', typeof(res));
        callback(null, res);
    },(err)=>{
        console.log('---ERROR---');
        callback(err, 'errorMsg' + err.stack);
    });
    console.log('typeof promise:', typeof(promise));
    console.log('promise:', promise);

};

async function sendRequest(opts,replyData){
    return new Promise(((resolve,reject)=>{
        console.log('Promiseの引数の関数開始');
        let req = https.request(opts, (response) => {
            console.log('---response---');
            response.setEncoding('utf8');
            let body = '';
            response.on('data', (chunk)=>{
                console.log('chunk:', chunk);
                body += chunk;
            });
            response.on('end', ()=>{
                console.log('end:', body);
                resolve(body);
            });
        }).on('error', (err)=>{
            console.log('error:', err.stack);
            reject(err);
        });
        req.write(replyData);
        req.end();
        console.log('Promiseの引数の関数終了');
    }));
};
