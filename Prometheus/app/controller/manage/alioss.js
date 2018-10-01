'use strict';

const Controller = require('egg').Controller;
const { STS } = require('ali-oss');
const fs = require('fs');
const path = require('path');

class AliOSSController extends Controller {

  async getSTSSignature() {

    const ctx = this.ctx;
    let policy;
    const aliConfigObj = ctx.app.aliConfig();
    if (aliConfigObj.PolicyFile) {
      policy = fs.readFileSync(path.resolve(__dirname, aliConfigObj.PolicyFile)).toString('utf-8');
    }

    const client = new STS({
      accessKeyId: aliConfigObj.AccessKeyId,
      accessKeySecret: aliConfigObj.AccessKeySecret
    });

    client.assumeRole(aliConfigObj.RoleArn, policy, aliConfigObj.TokenExpireTime).then((result) => {
        console.log("*****************:"+result);
        ctx.body = result;

        console.log("AccessKeyId:", result.credentials.AccessKeyId );
        console.log("AccessKeySecret:", result.credentials.AccessKeySecret );
        console.log("SecurityToken:", result.credentials.SecurityToken );
        console.log("Expiration:", result.credentials.Expiration );
    }).catch((err) => {
      console.log(err);
      ctx.body = err;
    });
  }


}

module.exports = AliOSSController;
