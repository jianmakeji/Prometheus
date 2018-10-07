module.exports = () => {
  const jwt = require('jsonwebtoken');

  return async (ctx, next) => {
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization'].split(' ')[1];

      let decoded; //解码token
      try {
        decoded = jwt.verify(token, ctx.app.jwtSlot());

      } catch (error) {
        if (error.name == 'TokenExpiredError') {

          token = jwt.sign({
              user_id: decoded.user_id,
              user_name: decoded.user_name
            },
            ctx.app.jwtSlot(), {
              expiresIn: '10 days'
            });
          ctx.cookies.set('token', token, {
            maxAge: 60 * 1000,
            httpOnly: false,
            overwrite: true,
            signed: false
          });
        } else {
          ctx.status = 401;
          ctx.body = ctx.app.failure('token失效!');
          return;
        }
      }
      //重置cookie时间
      ctx.cookies.set('token', token, {
        maxAge: 60 * 1000 * 60 * 24 * 10,
        httpOnly: false,
        overwrite: true,
        signed: false
      });
      await next();
    } else {
      ctx.status = 401;
      ctx.body = ctx.app.failure('没有token!');

      return;
    }
  }
};
