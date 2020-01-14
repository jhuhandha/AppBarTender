const express = require('express');

var app = express();

app.use("/user", require("./users.routes"));

module.exports = app;