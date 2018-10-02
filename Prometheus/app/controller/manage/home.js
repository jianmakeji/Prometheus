'use strict';

const Controller = require('egg').Controller;
const crypto = require("crypto");

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
}
module.exports = HomeController;
