const { Order, Drink, OrderHasDrink, sequelize, User } = require('./../models');

const { validationResult } = require('express-validator');

const index = (req, res) => {
  Order.findAll({
    include: [{ model: OrderHasDrink, include: [Drink] }, {model: User}],
  })
    .then(orders =>
      res.json({
        ok: true,
        orders,
      })
    )
    .catch(err =>
      res.status(500).json({
        ok: false,
        message: err.message,
      })
    );
};

const save = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ ok: false, err: errors.array() });
  }

  let transaction;
  try {
    transaction = await sequelize.transaction();

    let user_id = req.user.id;

    let { tip, subtotal, total } = req.body;
    let order_has_drink = req.body.drinks;

    let order = await Order.create({ tip, subtotal, total, user_id });

    await OrderHasDrink.bulkCreate([
      ...order_has_drink.map(e => {
        return { ...e, order_id: order.id };
      }),
    ]);

    await transaction.commit();
    return res.json({
      ok: true,
      order,
    });
  } catch (ex) {
    if (transaction) await transaction.rollback();
    return res.status(500).json({
      ok: false,
      message: ex.message,
    });
  }
};

module.exports = {
  index,
  save,
};
