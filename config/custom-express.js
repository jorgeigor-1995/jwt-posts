const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');


module.exports = () => {
  const app = express();

  app.use(
    bodyParser.json({
      limit: '50mb'
    })
  );
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '50mb'
    })
  );
  app.use(cors());

  app.get('/api/', function (req, res, next) {
    res.json('online');
  });

  const User = require('../app/usuario/controller');
  app.post('/api/cadastro', User.new);

  /*Login de Usuarios*/
  app.use('/api/', require('../app/usuario/auth'));

  /*Mid para rotas da API verificar JWT*/
  var jwt = require('../core/jwt');
  app.use('/api/v1', jwt);

  jwt.use("/usuario", require('../app/usuario'));
  jwt.use('/post', require('../app/posts'));
  jwt.use('/upload', require('../app/upload'));


  return app;
}