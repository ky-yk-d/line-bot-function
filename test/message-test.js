var assert = require('power-assert');
var myModule = require('../src/message');
const jsonFile = require('../dialogue.json');

describe('test', () => {
  it('位置情報メッセージが返却される', () => {
    data = {
      type: 'message',
      message: {
        type: 'text',
        text: '住所'
      }
    };
    assert(myModule.getMessageObj(data,jsonFile).type === 'location');
  });
  it('テンプレートメッセージが返却される', () => {
    data = {
      type: 'message',
      message: {
        type: 'text',
        text: 'テスト'
      }
    };
    assert(myModule.getMessageObj(data,jsonFile).type === 'template');
  });

  it('画像メッセージが返却される', () => {
    data = {
      type: 'message',
      message: {
        type: 'image'
      }
    };
    assert(myModule.getMessageObj(data,jsonFile).type === 'image');
  });

  it('スタンプメッセージが返却される', () => {
    data = {
      type: 'message',
      message: {
        type: 'sticker'
      }
    };
    assert(myModule.getMessageObj(data,jsonFile).type === 'sticker');
  });

  it('対応していないメッセージ種類', () => {
    data = {
      type: 'message',
      message: {
        type: 'dummy'
      }
    };
    assert(myModule.getMessageObj(data,jsonFile).text === 'ごめんなさい！文章での入力をお願いします！');
  });

  it('ポストバックイベントの場合', () => {
    data = {
      type: 'postback',
      postback: {
        data: 'dialogue3'
      }
    };
    assert(myModule.getMessageObj(data,jsonFile).template.type === 'buttons');
  });

  it('対応していないイベントタイプ', () => {
    data = {
      type: 'dummy',
    };
    assert(myModule.getMessageObj(data,jsonFile).text === 'ごめんなさい！まだこのイベントには対応していません！');
  });
});