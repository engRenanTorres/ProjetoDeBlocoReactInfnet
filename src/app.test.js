import { render, screen, fireEvent } from '@testing-library/react';

function soma (x, y) {
    return x + y;
  }
  
  describe('funcao soma', () => {
    it('should return 5 when sum 2 + 3', async () => {
      const resposta = soma(2, 3);
      expect(resposta).toBe(5);
    });
  });
