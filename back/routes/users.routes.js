const express = require ('express');
const {login} = require ('./../controllers/users.controller');

var router = express.Router ();

router.post('/login', login);

module.exports = router;
