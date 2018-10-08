module.exports = () => {
  const jwt = require('jsonwebtoken');

  return async (ctx, next) => {
    if (ctx.request.header['authorization']) {
      
      let token = ctx.request.header['authorization'];

      let decoded; //解码token
      try {
        decoded = jwt.verify(token, ctx.app.jwtSlot);

      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          ctx.status = 402;
          ctx.body = ctx.app.failure('token失效!');
        } else {
          ctx.status = 401;
          ctx.body = ctx.app.failure(error.name);
          return;
        }
      }

      await next();
    } else {
      ctx.status = 403;
      ctx.body = ctx.app.failure('没有token!');

      return;
    }
  }
};
