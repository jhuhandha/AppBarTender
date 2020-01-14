const Sequelize = require ('sequelize');
const UserModel = require('./user.model');
const DrinkModel = require('./drink.model');
const OrderModel = require('./order.model');
const OrderHasDrinkModel = require('./order_has_drink.model');

const sequelize = new Sequelize (process.env.MYSQL, {
  define: {
    timestamps: false,
  },
});

const User = UserModel(sequelize, Sequelize);
const Drink = DrinkModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const OrderHasDrink = OrderHasDrinkModel(sequelize, Sequelize);

User.associate = (models) => {
  User.hasMany(models.order);
};

Order.associate = (models) => {
  Order.belongsTo(models.user);
  Order.hasMany(models.order_has_drink);
  Drink.hasMany(models.order_has_drink);
};

OrderHasDrink.associate = (models) => {
  OrderHasDrink.belongsTo(models.order);
  OrderHasDrink.belongsTo(models.drink);
};

module.exports = {
  sequelize,
  User,
  Drink,
  Order,
  OrderHasDrink
}