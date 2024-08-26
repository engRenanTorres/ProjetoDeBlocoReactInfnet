import { HttpBasicClient } from "./httpClient.js";

export const cepClient = async (cep) => {
  if (cep.length !== 8) {
    throw new Error("CEP inválido! O CEP deve ter 8 dígitos.");
  }

  try {
    const response = await HttpBasicClient.get(
      `https://viacep.com.br/ws/${cep}/json/`,
    );

    console.log("aqui", response);
    if (response.body.erro) {
      return null; // CEP não encontrado
    }

    return {
      street: response.body.logradouro,
      neighborhood: response.body.bairro,
      city: response.body.localidade,
      state: response.body.uf,
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    throw new Error("Erro ao buscar o CEP.");
  }
};
