const {User} = require ('./../models');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

let login = (req, res) => {
  User.findOne ({
    where: {username: req.body.username},
  })
    .then (user => {
      if (!user) {
        return res.status (404).json ({
          ok: false,
          message: 'Usuario o clave invalida',
        });
      }

      let {id, name, username, password, role} = user;

      if (!bcrypt.compareSync (req.body.password, password)) {
        return res.status (404).json ({
          ok: false,
          message: 'Usuario o clave invalida',
        });
      }

      console.log ('nuevo', password);

      let token = jwt.sign (
        {
          data: {id, name, username, role},
        },
        process.env.SECRET,
        {
          expiresIn: '12h',
        }
      );

      res.json ({
        ok: true,
        user: {id, name, username, role},
        token,
      });
    })
    .catch (err =>
      res.status (500).json ({
        ok: false,
        err,
      })
    );
};

module.exports = {
  login,
};
