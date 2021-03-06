const { check, sanitize, body} = require('express-validator');

module.exports = () => [
    check('tip').notEmpty(),

    check('drinks').isArray(),
     
    body('subtotal')
    .custom(value => !parseInt(value) ? false: true),

    body('total')
    .custom(value => !parseInt(value) ? false: true),

    body('drinks.*.amount').custom(value => value < 1 ? false: true),

    body('drinks.*.subtotal')
    .custom(value => !parseInt(value) ? false: true),
]