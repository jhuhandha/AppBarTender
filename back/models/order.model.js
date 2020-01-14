module.exports = (sequelize, type) => {
  return sequelize.define (
    'order',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: type.DATE,
        defaultValue: type.literal('CURRENT_TIMESTAMP'),
      },
      tip: type.STRING,
      subtotal: type.FLOAT,
      total: type.FLOAT,
      user_id: {
        type: type.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      type,
      engine: 'InnoDB',
    }
  );
};
