const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authorization = require('../auth/auth');

const produto = require('../modules/produto/produto.controller');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Ativar CORS
app.use(cors());

/// Rota de login não tem header authorization, entao fica acima do mapeamento da leitura de autorizacao
authorization.route(app);

// / A partir daqui chamadas a API sem HEADER authorization serão barradas
app.use(authorization.readAuthorization);

// Mapeamento das rotas do modulo
produto.route(app);

// Caso nao encontrar a rota 
app.use(function(req, res, next) {
  const err = new Error('URL não encontrada');
  err.status = 404;
  next(err);
});


// Padrao de retorno para todas as mensagens de erro com exception
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    sucesso: false,
    mensagem: err.message,
    data: {},
  });
});

module.exports = app;
