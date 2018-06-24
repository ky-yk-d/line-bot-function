let https = require('https');

exports.generateRequest = (replyData) => {
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
  
  return https.request(opts, function(res) {
    res.on('replyData', function(res) {
      console.log(res.toString());
    }).on('error', function(e) {
      console.log('ERROR: ' + e.stack);
    });
  });
};