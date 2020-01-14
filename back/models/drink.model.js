module.exports = (sequelize, type) => {
  return sequelize.define (
    'drink',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING,
      icon: type.STRING,
      unit_price: type.FLOAT,
    },
    {
      type,
      engine: 'InnoDB',
    }
  );
};
