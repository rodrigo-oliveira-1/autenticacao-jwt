const jwt = require('jsonwebtoken');
const Response = require('../core/response');

function readAuthorization(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'undefined') {
    new Response(res).unauthorized();
    return;
  }

  req.token = bearerHeader.split(' ')[1];
  next();
}

function readToken(req, res, next) {
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, function(err, decodedToken,) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          new Response(res).unauthorized('Sua sessão expirou!');
        } else {
          new Response(res).unauthorized("Token inválido");
        }
        return;
      }

      req.credenciais = decodedToken;

      /// Aqui você buscaria o seu usuário no banco de dados com base no ID do usuario do token
      //const usuario = await usuarioModel.findByPk(decodedToken.usuarioId);
      const usuario = {
        usuarioId    : 10,
        usuarioEmail : 'user@test.com'
      }

      if (!usuario) {
        new Response(res).unauthorized();
        return;
      }
      
      next();
  });
}


async function login(req, res){
    let {usuario, senha} = req.body;
    
    const usuarioExemplo = 'user@test.com';
    const senhaExemplo   = '123456';

    /// Aqui você pode trocar esta validação "fixa" por um acesso à sua tabela de usuários do banco de dados
    loginValido = usuario === usuarioExemplo && senha === senhaExemplo;
    
    if (!loginValido) {
        new Response(res).unauthorized("Usuário ou senha inválidos");
        return;
    }

    let loginData = {
        usuarioId    : 10,
        usuarioEmail : usuarioExemplo
    }
    
    jwt.sign(loginData, process.env.JWT_SECRET_KEY, async function(err, token) {
        if (err) {
            return new Response(res).preConditionFailed()    
        }

        new Response(res).success(token)
    });
}

const routerLogin = require('express').Router();
routerLogin.post('/login', login);

function route(app){
    app.use(routerLogin)
}

module.exports = {
  readAuthorization,
  readToken,
  login,
  route
};
