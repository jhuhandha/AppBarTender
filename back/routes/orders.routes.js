const express = require ('express');
const {index, save} = require ('./../controllers/orders.controller');

const { auth } = require("./../middleware/auth");

const OrderValidation = require('./../validation/order.validation');

var router = express.Router ();

router.get('/order', auth, index);
router.post('/order', [...OrderValidation(), auth], save);

module.exports = router;
