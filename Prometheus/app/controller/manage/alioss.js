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

    await client.assumeRole(aliConfigObj.RoleArn, policy, aliConfigObj.TokenExpireTime).then((result) => {
      ctx.body = result;
    }).catch((err) => {
      ctx.body = ctx.app.failure(err);
    });
  }
}

module.exports = AliOSSController;
