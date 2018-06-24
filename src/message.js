/**
 * 入力されたデータに応じて、返すメッセージを生成する関数
 * @param {} data 入力されたデータ
 * @param {} jsonFile 外部ファイルから読み込んだJSON形式のデータ
 * @return {} メッセージオブジェクト
 * @author こまど（ky_yk_d）
 */
exports.getMessageObj = (data, jsonFile)=> {
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
          } else if (data.message.type == "sticker"){
              console.log('スタンプメッセージ');
              return jsonFile.stickerMessage;
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