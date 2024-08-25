export const fetchAddressByCep = async (cep) => {
  if (cep.length !== 8) {
    throw new Error("CEP inválido! O CEP deve ter 8 dígitos.");
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      return null; // CEP não encontrado
    }

    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    throw new Error("Erro ao buscar o CEP.");
  }
};
