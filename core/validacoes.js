const { InvalidArgumentError } = require('./erros');

module.exports = {
  campoStringNaoNulo: async (valor, nome) => {
    if (typeof valor !== 'string' || valor === 0)
      throw new InvalidArgumentError(`É necessário preencher o campo ${nome}!`);
  },

  campoTamanhoMinimo: async (valor, nome, minimo) => {
    if (valor.length < minimo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser maior que ${minimo} caracteres!`
      );
  },

  campoTamanhoMaximo: async (valor, nome, maximo) => {
    if (valor.length > maximo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser menor que ${maximo} caracteres!`
      );
  }
};