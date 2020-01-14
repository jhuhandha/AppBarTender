const express = require('express');
// const usuarioController = require('./../controller/usuarioController');

var router = express.Router();

router.post("/login", usuarioController.login);

module.exports = router;