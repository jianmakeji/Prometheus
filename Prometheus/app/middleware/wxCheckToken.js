module.exports = () => {
  const jwt = require('jsonwebtoken');

  return async (ctx, next) => {
    if (ctx.request.header['authorization']) {

      let headerString = ctx.request.header['authorization'].split('#');

      let token = headerString[0];
      let openId = headerString[1];

      let decoded; //解码token
      try {
        decoded = jwt.verify(token, ctx.app.jwtSlot);

      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          const user = ctx.service.user.findByOpenId(openId);
          token = jwt.sign({
            username: user.username,
            openId: user.openId
          }, ctx.app.jwtSlot, {
            expiresIn: '10 days'
          });

          ctx.status = 409;
          ctx.body = ctx.app.expireToken('token失效!', token);
        }
        else if (error.name == 'JsonWebTokenError')//被伪造
        {
          ctx.status = 407;
          ctx.body = ctx.app.failure('token被伪造');
          return;
        }
        else {
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
