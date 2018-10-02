'use strict';

const Service = require('egg').Service;

class ManageUser extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.ManageUser.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const user = await this.ctx.model.ManageUser.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async findByUserName(username){
      const user = await this.ctx.model.ManageUser.findAll({
        where :{
          username:username
        }
      });
      return user;
  }

  async create(user) {
    return this.ctx.model.ManageUser.create(user);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.ManageUser.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

}

module.exports = ManageUser;
