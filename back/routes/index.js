const express = require('express');

var app = express();

app.use("/api", require("./users.routes"));

module.exports = app;