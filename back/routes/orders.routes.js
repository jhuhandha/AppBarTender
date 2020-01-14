const express = require ('express');
const {index, save} = require ('./../controllers/orders.controller');

const { auth } = require("./../middleware/auth");

var router = express.Router ();

router.get('/order', auth, index);
router.post('/order', auth, save);

module.exports = router;
