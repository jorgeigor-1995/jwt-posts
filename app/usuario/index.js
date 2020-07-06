const express = require('express');
const rotas = express.Router();

const controller = require("./controller");

rotas.get("/", controller.index);
rotas.get('/:id', controller.get);
rotas.delete('/:id', controller.delete);

module.exports = rotas;