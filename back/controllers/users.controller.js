const Usuario = require("./../models/usuarioModels");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

let login = (req, res) => {

    Usuario.findOne({
        usuario: req.body.usuario
    }, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                men: "Usuario o clave invalida"
            });
        }

        if (!bcrypt.compareSync(req.body.clave, usuario.clave)) {
            return res.status(404).json({
                ok: false,
                men: "Usuario o clave invalida"
            });
        }

        let token = jwt.sign({
            data: usuario
        }, process.env.SECRET, {
            expiresIn: '4h'
        });

        res.json({
            ok: true,
            usuario,
            token
        });

    });

}

module.exports = {
    login
}