export const validarCep = (cep) => /^\d{8}|^\d{5}-\d{3}$/.test(cep);

export const validarNome = (nome) => nome.length >= 3;

export const validarEmail = (email) => !!email;

export const validarCampos = ({ nome, email, cep }) => {
  const erros = {};
  if (!validarNome(nome))
    erros.nome = "O nome deve ter pelo menos 3 caracteres";
  if (!validarEmail(email)) erros.email = "O email é obrigatório";
  if (!validarCep(cep))
    erros.cep = "O CEP deve ser no formato 00000-000 ou apenas números";

  return erros;
};
