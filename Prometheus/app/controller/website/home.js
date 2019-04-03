'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async eliteSchoolFile(){
    const ctx = this.ctx;
    await ctx.render('eliteSchoolFile.html');
  }

  async specialColumnFile(){
    const ctx = this.ctx;
    await ctx.render('specialColumnFile.html');
  }
}

module.exports = HomeController;
