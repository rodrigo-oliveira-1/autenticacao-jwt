const authorization = require('../../auth/auth')
const routerProduto = require('express').Router();

function getAll(req, res){
    res.json({data: 'Todos os produtos retornados com sucesso.'})
}

function getOne(req, res){
    res.json({data: 'Um produto retornado com sucesso.'})
}

/// Mapeamento das rotas
routerProduto.get('/produto', getAll)
routerProduto.get('/produto/:id', getOne)



// roteamento do modulo no app
function route(app){
    app.use(authorization.readToken, routerProduto)
}


module.exports = {
    route
};