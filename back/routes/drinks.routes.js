const express = require ('express');
const {index, save, edit, modify, showImage} = require ('./../controllers/drinks.controller');

const { auth, auth_image } = require("./../middleware/auth");

var router = express.Router ();

router.get('/drink', auth, index);
router.get('/drink/show/:image', auth_image, showImage);
router.post('/drink', auth, save);
router.get('/drink/:id', auth, edit);
router.put('/drink/:id', auth, modify);

module.exports = router;
