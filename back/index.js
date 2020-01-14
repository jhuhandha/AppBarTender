require ('./config');

const express = require ('express');
const bodyParser = require ('body-parser');
const fileUpload = require ('express-fileupload');
const bcrypt = require ('bcrypt');

const { sequelize, User } = require ('./models');

const app = express ();

app.use (fileUpload ());
app.use (function (req, res, next) {
  res.header ('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next ();
});
app.use (
  bodyParser.urlencoded ({
    extended: true,
  })
);
app.use (bodyParser.json ());

app.get ('/', function (req, res) {
  res.send ('Bienvenido API REST');
});

app.use (require ('./routes'));

sequelize.sync ({force: true}).then (() => {
  User.bulkCreate ([
    {
      name: 'Juan',
      username: 'juanda',
      password: bcrypt.hashSync ('123456', 10),
      role: 'ADMIN',
    },
    {
      name: 'Andrea',
      username: 'andrea',
      password: bcrypt.hashSync ('123456', 10),
      role: 'BARTENDER',
    },
  ]);

  app.listen (process.env.PORT, () =>
    console.log (`API Connect port ${process.env.PORT}`)
  );
});
