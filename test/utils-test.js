const assert = require('power-assert');
const myModule = require('../src/utils');

describe.skip('util.jsのテスト', () => {
  it('パスが適切に設定されている', () => {
    replyData = JSON.stringify({
      replyToken: 'dummyReplyToken',
      messages: [
          {
            dummy: 'dummyMessageObject'
          }
       ] 
    });
    let req = myModule.generateRequest(replyData);
    assert(req.path === '/v2/bot/message/reply');
    // TODO: Error: socket hang up となるのを防ぐ
    req.end();
  });
});

