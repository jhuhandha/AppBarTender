const {Order, Drink, OrderHasDrink, sequelize} = require ('./../models');

const index = (req, res) => {
  Order.findAll ({
    include: [{model: OrderHasDrink, include: [Drink]}],
  })
    .then (orders =>
      res.json ({
        ok: true,
        orders,
      })
    )
    .catch (err =>
      res.status (500).json ({
        ok: false,
        err,
      })
    );
};

const save = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction ();

    let user_id = req.user.id;

    let {tip, subtotal, total} = req.body;
    let order_has_drink = req.body.orders;

    let order = await Order.create ({tip, subtotal, total, user_id});

    console.log ('order', order);

    await OrderHasDrink.bulkCreate ([
      ...order_has_drink.map (e => {
        return {...e, order_id: order.id};
      }),
    ]);

    await transaction.commit ();
    return res.json ({
      ok: true,
      order,
    });
  } catch (ex) {
    if (transaction) await transaction.rollback ();
    return res.status (500).json ({
      ok: false,
      err: ex.message,
    });
  }
};

module.exports = {
  index,
  save,
};
