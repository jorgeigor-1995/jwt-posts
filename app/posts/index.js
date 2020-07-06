const express = require('express');
const rotas = express.Router();

const controller = require("./controller");

rotas.get("/", controller.index);
rotas.get('/:id', controller.get);
rotas.post("/", controller.new);
rotas.delete('/:id', controller.delete);

module.exports = rotas;