const assert = require('power-assert');
const myModule = require('../src/utils');

describe('util.jsのテスト', () => {
  it('適切なreq Objectを返すか', () => {
    replyData = JSON.stringify({
      replyToken: 'dummyReplyToken',
      messages: [
          {
            dummy: 'dummyMessageObject'
          }
       ] 
   });
   let expected = {
     replyToken: 'dummyReplyToken',
     messages:[
        {
         dummy: 'dummyMessageObject2'
        }
      ]
    };
   assert(expected.toString() === myModule.generateRequest(replyData).toString());
  });
});

