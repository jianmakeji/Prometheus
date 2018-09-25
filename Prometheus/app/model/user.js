module.exports = app =>{
  const {STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user',{
    Id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username:STRING(30),
    password:STRING(50),
    headicon:STRING(100),
    created_at:DATE,
  });

  User.findByUsername = async (username) => {
    return await this.findOne({
      where:{
        username:username
      }
    });
  }

  return User;
};
