import { render, screen, fireEvent } from "@testing-library/react";

function soma(x, y) {
  return x + y;
}

describe("funcao soma", () => {
  it("should return 5 when sum 2 + 3", async () => {
    const resposta = soma(2, 3);
    expect(resposta).toBe(5);
  });
});

function calcula(x, y, funcaoDeSoma) {
  const resultado = funcaoDeSoma(x, y);
  return resultado;
}

describe("funcao calcula", () => {
  it("should call funcaoDeSoma with the correct arguments and return the result", async () => {
    // Criando um mock para a função de soma
    const mockFuncaoDeSoma = jest.fn().mockReturnValue(10);
    const resultado = calcula(4, 6, mockFuncaoDeSoma);
    expect(resultado).toBe(10);
    expect(mockFuncaoDeSoma).toHaveBeenCalledWith(4, 6);
    expect(mockFuncaoDeSoma).toHaveBeenCalledTimes(1);
  });
});
