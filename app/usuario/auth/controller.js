const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const config = require('../../../config');
const Usuario = require('../model');

exports.login = async (req, res) => {
  return await efetuarLogin(false, req, res);
};

function compare(passform, passuser) {
  return new Promise(resolve => {
    bcrypt.compare(passform, passuser, function (err, ok) {
      if (err) resolve(false);
      resolve(ok);
    })
  })
}

async function efetuarLogin(root, req, res) {
  const filtro = {
    email: req.body.email,
    ativo: { $ne: false }
  }
  
  if (root) {
    filtro.root = true;
  }

  const user = await Usuario.findOne(filtro);

  if (!user)
    return res.json({
      success: false,
      message: 'Usuário não encontrado',
      email: req.body.email
    });
    
  const ok = await compare(req.body.password, user.password);

  if (!ok) return res.json({
      success: false,
      message: 'Usuário não encontrado'
  });
  
  console.log('Login de usuário: ' + user.name);

  var beAToken = {};
  beAToken.email = user.email;
  beAToken._id = user._id;
  beAToken.name = user.name;
  beAToken.root = user.root;

  var token = jwt.sign(beAToken, config.CHAVE_JWT, {
    expiresIn: '365d' // expires in 24 hours
  });

  // return the information including token as JSON
  return res.json({
    success: true,
    data: user,
    message: 'Login efetuado com sucesso!',
    token: token
  });
}

/*exports.EnviaEmailResetSenha = async (req, res) => {
  const existelogin = await Usuario.findOne({
    email: req.body.email
  });
  if (existelogin) {
    let assunto = 'Resetar senha.';
    const tituloNav = 'Rooff';
    const urlImg = 'https://rooff.com.br/og.jpg';
    const textoApresentacao = `Olá ${existelogin.nome}, você deseja redefinir sua senha?`;
    const textoPrincipal =
      'Alguém (esperamos que você) solicitou a redefinição da senha da sua conta. Clique no botão abaixo para fazê-lo. Se você não solicitou esta redefinição de senha, basta ignorar este email.';
    const url = `https://rooff.com.br/reset-senha/${existelogin._id}`;
    const textoLink = 'Redefinir sua senha';
    const TextoFinal =
      'Você tem apenas 10 minutos após o envio desse email para redefinir sua senha por meio desse link';
    const alt = 'Rooff';

    const html = await templateEmail.configurarTemplate(
      tituloNav,
      urlImg,
      textoApresentacao,
      textoPrincipal,
      url,
      textoLink,
      TextoFinal,
      alt,
      req.body.email
    );

    const destinatario = {};
    destinatario.nome = 'Rooff';
    destinatario.email = existelogin.email;

    await emailSender.sendEmailTemplate(
      `Rooff - ${assunto}`, 
      tituloNav,
      textoApresentacao,
      textoPrincipal,
      url,
      textoLink,
      TextoFinal,
      alt,
      existelogin.nome,
      existelogin.email
    );
    
    res.json({
      success: true,
      response: ' E-mail enviado com sucesso!'
    });

  } else {
    res.json({
      success: false,
      response: 'Login Não encontrado'
    });
  }
};

exports.ResetSenha = async (req, res) => {
  const usuario = await Usuario.findOne({
    _id: req.body._id
  });
  usuario.password = req.body.password;
  await usuario.save();
  res.json({
    success: true
  });
};*/