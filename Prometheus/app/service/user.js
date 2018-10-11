'use strict';

const Service = require('egg').Service;

class User extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.User.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async create(user) {
    const userObj = await this.ctx.model.User.findAll({
      where:{
        openId:user.openId
      }
    });
    if (userObj){
      return this.ctx.model.User.create(user);
    }
    else{
      throw new Error('用户已存在');
    }
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

  async del(id) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }

  async findByOpenId(openId){
    return this.ctx.model.User.findAll({
      where:{
        openId:user.openId
      }
    });
  }
}

module.exports = User;
