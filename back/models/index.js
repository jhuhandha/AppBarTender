const Sequelize = require ('sequelize');
const UserModel = require ('./user.model');
const DrinkModel = require ('./drink.model');
const OrderModel = require ('./order.model');
const OrderHasDrinkModel = require ('./order_has_drink.model');

const sequelize = new Sequelize (process.env.MYSQL, {
  define: {
    timestamps: false,
  },
});

const User = UserModel (sequelize, Sequelize);
const Drink = DrinkModel (sequelize, Sequelize);
const Order = OrderModel (sequelize, Sequelize);
const OrderHasDrink = OrderHasDrinkModel (sequelize, Sequelize);

User.hasMany (Order, {foreignKey: 'user_id'});

Order.belongsTo (User, {foreignKey: 'user_id'});
Order.hasMany (OrderHasDrink, {foreignKey: 'order_id'});
Drink.hasMany (OrderHasDrink, {foreignKey: 'drink_id'});

OrderHasDrink.belongsTo (Order, {foreignKey: 'order_id'});
OrderHasDrink.belongsTo (Drink, {foreignKey: 'drink_id'});

module.exports = {
  sequelize,
  User,
  Drink,
  Order,
  OrderHasDrink,
};
