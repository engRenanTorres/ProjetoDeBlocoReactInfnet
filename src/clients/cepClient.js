import { HttpBasicClient } from "./httpClient.js";

export const cepClient = async (cep) => {
  if (cep.length !== 8) {
    throw new Error("CEP inválido! O CEP deve ter 8 dígitos.");
  }

  try {
    const response = await HttpBasicClient.get(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    if (!response.ok) {
      return null; // CEP não encontrado
    }

    return {
      rua: response.body.logradouro,
      bairro: response.body.bairro,
      cidade: response.body.localidade,
      estado: response.body.uf,
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    throw new Error("Erro ao buscar o CEP.");
  }
};
