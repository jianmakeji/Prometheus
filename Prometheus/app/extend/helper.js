'use strict';

let OSS = require('ali-oss');

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  aliConfig: () => {
    const alioss = exports = {};

    alioss.region = 'oss-cn-hangzhou';
    alioss.AccessKeyId = 'LTAIkUgfJUoAgdcT';
    alioss.AccessKeySecret = '41W3jB8PCFNkgDjcr8zklMJUKdYYU5';
    alioss.endpoint = 'oss-cn-hangzhou.aliyuncs.com';
    alioss.PolicyFile = 'policy/all_policy.txt';
    alioss.RoleArn = 'acs:ram::1751937945456422:role/prometheusfileoperation';
    alioss.TokenExpireTime = '3600';
    alioss.bucket = 'jm-prometheus';

    return alioss;
  },

  jwtSlot: 'LTAIkUgFNkgDjcr8zklMJfJUoAgdcT',
  wx_secret: '8c05c4d7e9970ca9cd1520fd8b857572',
  wx_appid: 'wx781d229c4c3bd932',

  courseImagePath:'courseImages/',
  courseVideoPath:'courseVideos/',
  articleImagePath: 'articleImages/',
  qrCodePath: 'qrCode/',
  downloadFile: 'downloadFile/',

  signatureUrl(objectPath,thumbName){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    if (typeof(thumbName) == "undefined"){
      return client.signatureUrl(objectPath, {expires: 3600});
    }
    else{
      return client.signatureUrl(objectPath, {expires: 3600,process : 'style/'+thumbName});
    }

  },

  async deleteOssObject(objectPath){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    return client.delete(objectPath);
  },

  async deleteOssMultiObject(objectArrayPath){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    return client.deleteMulti(objectArrayPath);
  },

  async putOssObject(objectName,stream){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });

    try {
      let result = await client.putStream(objectName, stream);
    } catch (e) {
      console.log(e)
    }
  },

  randomString: (len)=> {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTVUWXYZLIabcdefhijkmnpgqvurstwxyz123456789';
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  },

  randomCodeString: (len)=> {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTVUWXYZLI123456789';
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  },

  //接口统一返回数据操作
  success: (message)=>{
    const result = {
      'status':200,
      'message':message,
    };
    return result;
  },

  loginSuccess: (message,token,username,userId)=>{
    const result = {
      'status':200,
      'message':message,
      'token':token,
      'username':username,
      'userId':userId,
    };
    return result;
  },

  failure: (message)=>{
    const result = {
      'status':500,
      'message':message,
    };
    return result;
  },

  expireToken:(message,token)=>{
    const result = {
      'status':409,
      'message':message,
      'token':token
    };
    return result;
  },

};
