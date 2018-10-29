const request = require('request');

module.exports.getAccessToken = (wx_appid,wx_secret) => {

  return new Promise((resolve, reject) => {
    const requestUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wx_appid}&secret=${wx_secret}`;
    request(requestUrl, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports.getQRCodeImage = (bodyResult,qrFileName,id) => {
  const requestResult = JSON.parse(bodyResult);
  if (requestResult.access_token) {
    const token = requestResult.access_token;
    const ctx = this.ctx;

    const requestQRCodeUrl = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${token}`;
    //const requestQRCodeUrl = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`;
    let requestData = {
      //'scene': 'xxx',
      'path': `pages/curriculum/curriculumDetail/curriculumDetail?id=${id}`,
      'width': '430',
    };

    return new Promise((resolve, reject) => {
      resolve(
        request({
          url: requestQRCodeUrl,
          method: "POST",
          body: JSON.stringify(requestData),
        }));
    });
  }
  else{
    return null;
  }
}
