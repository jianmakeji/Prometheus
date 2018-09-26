'use strict';

const Service = require('egg').Service;

class Exchange extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Exchange.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const exchange = await this.ctx.model.Exchange.findById(id);
    if (!exchange) {
      this.ctx.throw(404, 'exchange not found');
    }
    return exchange;
  }

  async create(exchange) {
    return this.ctx.model.Exchange.create(exchange);
  }

  async update({ id, updates }) {
    const exchange = await this.ctx.model.Exchange.findById(id);
    if (!exchange) {
      this.ctx.throw(404, 'exchange not found');
    }
    return exchange.update(updates);
  }

  async del(id) {
    const exchange = await this.ctx.model.Exchange.findById(id);
    if (!exchange) {
      this.ctx.throw(404, 'exchange not found');
    }
    return exchange.destroy();
  }
}

module.exports = Exchange;
