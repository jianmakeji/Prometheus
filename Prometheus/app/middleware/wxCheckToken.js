module.exports = () => {
  const jwt = require('jsonwebtoken');

  return async (ctx, next) => {
    if (ctx.request.header['authorization']) {

      let headerString = ctx.request.header['authorization'].split('#');

      let token = headerString[0];
      let openId = headerString[1];

      let decoded; //解码token
      try {
        decoded = jwt.verify(token, ctx.helper.jwtSlot);
        console.log(decoded);
      } catch (error) {
        console.log(error);
        if (error.name == 'TokenExpiredError') {
          const user = await ctx.service.user.findByOpenId(openId);
          token = jwt.sign({
            username: user.nickName,
            openId: user.openId
          }, ctx.helper.jwtSlot, {
            expiresIn: '100 days'
          });

          ctx.status = 409;
          ctx.body = ctx.helper.expireToken('token失效!', token);
          return;
        }
        else if (error.name == 'JsonWebTokenError')//被伪造
        {
          ctx.status = 407;
          ctx.body = ctx.helper.failure('token被伪造');
          return;
        }
        else {
          ctx.status = 401;
          ctx.body = ctx.helper.failure(error.name);
          return;
        }
      }

      await next();
    } else {
      ctx.status = 403;
      ctx.body = ctx.helper.failure('没有token!');

      return;
    }
  }
};
