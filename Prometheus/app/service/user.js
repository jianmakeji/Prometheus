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
    if (user.openId == '' || user.openId == null){
      throw new Error('用户openId不能为空');
    }
    else{
      const userObj = await this.ctx.model.User.findAll({
        where:{
          openId:user.openId
        }
      });
      if (userObj.length == 0){
        return this.ctx.model.User.create(user);
      }
      else{
        return userObj[0];
      }
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

    return await this.ctx.model.User.findAll({
      where:{
        openId:{[this.app.Sequelize.Op.eq]:openId}
      }
    });
  }
}

module.exports = User;
