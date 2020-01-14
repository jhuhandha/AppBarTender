module.exports = (sequelize, type) => {
  return sequelize.define (
    'user',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING,
      username: type.STRING,
      password: type.STRING,
      role: type.STRING,
    },
    {
      type
    }
  );
};
