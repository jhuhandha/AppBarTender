const Sequelize = require ('sequelize');

export const sequelize = new Sequelize (process.env.MYSQL, {
  define: {
    timestamps: false,
  },
});
