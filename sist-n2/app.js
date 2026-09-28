const express = require("express");
const contatoDao = require("./rotas/contatoDao");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/contatos", contatoDao);

module.exports = app;
