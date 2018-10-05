'use strict';

let OSS = require('ali-oss');

module.exports = {

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

  signatureUrl(objectPath){
    const config = this.aliConfig();
    let client = new OSS({
      region: config.region,
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.bucket,
    });
    return client.signatureUrl(objectPath, {expires: 3600});
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

  jwtSlot:() =>{
    return 'LTAIkUgFNkgDjcr8zklMJfJUoAgdcT';
  },

  getCourseImagePath:() =>{
    return 'courseImages/';
  },

  getCourseVideoPath:() =>{
    return 'courseVideos/';
  },

  getArticleImagePath:() =>{
    return 'articleImages/';
  },

  //接口统一返回数据操作
  success: (message)=>{
    const result = {
      'status':200,
      'message':message,
    };
    return result;
  },

  failure: (message)=>{
    const result = {
      'status':500,
      'message':message,
    };
    return result;
  }
}
