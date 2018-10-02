'use strict';

const Controller = require('egg').Controller;
const { STS } = require('ali-oss');
const fs = require('fs');
const path = require('path');

class AliOSSController extends Controller {

  async getSTSSignature() {

    const ctx = this.ctx;
    const aliConfigObj = ctx.app.aliConfig();

    const fileType = ctx.params.fileType;
    let dir = '';
    if (fileType == 1){
      dir = "courseImages/";
    }
    else if (fileType == 2){
      dir = "courseVideo/";
    }
    let host = "http://" + aliConfigObj.bucket + "." + aliConfigObj.endpoint;
    let policy;

    if (aliConfigObj.PolicyFile) {
      policy = fs.readFileSync(path.resolve(__dirname, aliConfigObj.PolicyFile)).toString('utf-8');
    }

    const client = new STS({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret
    });

    await client.assumeRole(aliConfigObj.RoleArn, policy, aliConfigObj.TokenExpireTime).then((result) => {
      result.credentials.host = host;
      result.credentials.dir = dir;
      ctx.body = result;
    }).catch((err) => {
      ctx.body = ctx.app.failure(err);
    });
  }
}

module.exports = AliOSSController;
