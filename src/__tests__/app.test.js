function soma(x, y) {
  return x + y;
}

describe("Funcao Soma", () => {
  it("should return 5 when sum 2 + 3", () => {
    const resposta = soma(2, 3);
    expect(resposta).toBe(5);
  });
});

function calculaResultado(x, y, funcaoSoma) {
  const resultado = funcaoSoma(x, y);
  return resultado;
}

describe("funcao calculaResultado", () => {
  it("should call funcaoDeSoma with the correct arguments and return the result", async () => {
    // Criando um mock para a função de soma
    const mockFuncaoDeSoma = jest.fn().mockReturnValue(10);
    const resultado = calculaResultado(4, 6, mockFuncaoDeSoma);
    expect(resultado).toBe(10);
    expect(mockFuncaoDeSoma).toHaveBeenCalledWith(4, 6);
    expect(mockFuncaoDeSoma).toHaveBeenCalledTimes(1);
  });
});
