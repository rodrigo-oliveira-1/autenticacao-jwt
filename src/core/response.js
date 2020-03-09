// eslint-disable-next-line max-classes-per-file
class Response {
    constructor(response) {
      this.response = response;
    }
  
    static HTTP_STATUS() {
      return {
        SUCCESS: 200,
        CREATED: 201,
        ACCEPT: 202,
  
        // Invalidos
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        PRE_CONDITION_FAILED: 412,
      };
    }
  
    success(dados, mensagem) {
      this.response.status(Response.HTTP_STATUS().SUCCESS).json({
        mensagem: mensagem || 'Ação executada com sucesso',
        dados,
        erros: [],
      });
    }
  
    created(dados, mensagem) {
      this.response.status(Response.HTTP_STATUS().CREATED).json({
        mensagem: mensagem || 'Registro incluído com sucesso',
        dados,
        erros: [],
      });
    }
  
    unauthorized(mensagem) {
      this.response.status(Response.HTTP_STATUS().UNAUTHORIZED).json({
        mensagem: mensagem || 'Acesso restrito',
        dados: {},
        erros: [],
      });
    }
  
    forbidden(mensagem) {
      this.response.status(Response.HTTP_STATUS().UNAUTHORIZED).json({
        mensagem:
          mensagem ||
          'Desculpe, você não tem permissão para acessar esta rotina. Contate o administrador do sistema',
        dados: {},
        erros: [],
      });
    }
  
    notfound(mensagem) {
      this.response.status(Response.HTTP_STATUS().NOT_FOUND).json({
        mensagem: mensagem || 'Registro / recurso não encontrado',
        dados: {},
        erros: [],
      });
    }
  
    preConditionFailed(mensagem) {
      this.response.status(Response.HTTP_STATUS().PRE_CONDITION_FAILED).json({
        mensagem: mensagem || 'Condição de entrada inválida',
        dados: {},
        erros: [],
      });
    }
  }
  
  module.exports = Response;
  