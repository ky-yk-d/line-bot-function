var assert = require('power-assert');
var myModule = require('../src/message');

describe('test', () => {
  it('test-1', () => {
    data = {
      type: 'message',
      message: {
        type: 'text',
        text: '住所'
      }
    };
    jsonFile = require('../dialogue.json');
    expected = {
      type:"location",
      title:"東京スカイツリー",
      address:"〒131-0045 東京都墨田区押上１丁目１−２",
      latitude:35.710139,
      longitude:139.810833
    };
    assert(myModule.getMessageObj(data,jsonFile).toString() === expected.toString());
  });
});