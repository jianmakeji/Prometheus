'use strict';

let OSS = require('ali-oss');
const Service = require('egg').Service;

class AliOSS extends Service {

  async getAliOSSClient(){
    const ctx = this.ctx;

    let client = new OSS({
      region: ctx.app.alioss.region,
      accessKeyId: ctx.app.alioss.AccessKeyId,
      accessKeySecret: ctx.app.alioss.AccessKeySecret
    });

    return client;
  }

  async putBucket(bucketname) {
    try {
      let client = await getAliOSSClient();
      const result = await client.putBucket(bucketname);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteBucket(bucketname) {
    try {
      const result = await client.deleteBucket(bucketname);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteObject (objectName) {
    try {
      let result = await client.delete(objectName);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteMultiObject (objectArray) {
    try {
      let result = await client.deleteMulti(objectArray, {
        quiet: true
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = AliOSS;
