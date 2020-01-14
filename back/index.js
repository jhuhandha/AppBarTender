require ('./config');

const express = require ('express');
const bodyParser = require ('body-parser');
const fileUpload = require ('express-fileupload');
const http = require ('http');

const app = express ();

let server = http.createServer (app);

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

app.use ("api", require ('./routes'));

server.listen (process.env.PORT, function () {
  console.log (`API Connect port ${process.env.PORT}`);
});
