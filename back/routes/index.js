const express = require('express');

var app = express();

app.use("/api", require("./users.routes"));
app.use("/api", require("./drinks.routes"));

module.exports = app;