const request = require('request');

module.exports.getAccessToken = (wx_appid, wx_secret) => {

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

module.exports.getQRCodeImage = (tokenBody, id) => {
  const tokenResult = JSON.parse(tokenBody);
  if (tokenResult.access_token) {
    const access_token = tokenResult.access_token;
    const ctx = this.ctx;

    //const requestQRCodeUrl = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${access_token}`;
    const requestQRCodeUrl = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`;
    let requestData = {
      'scene': `${id}`,
      'page': `pages/curriculum/curriculumDetail/curriculumDetail`,
      'width': '400',
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
