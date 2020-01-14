const express = require('express');

var app = express();

app.use("/api", require("./users.routes"));
app.use("/api", require("./drinks.routes"));
app.use("/api", require("./orders.routes"));

module.exports = app;