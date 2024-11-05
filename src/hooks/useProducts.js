import { useState, useEffect, useCallback } from "react";
import { APIClient } from "../clients/apiClient.js";

const ENDPOINT = "/products";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await APIClient.get(ENDPOINT);
      if (!response.ok) throw new Error("Falha ao buscar produtos");
      setProducts(response.body);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (newProduct) => {
    setLoading(true);
    setError(null);
    try {
      const response = await APIClient.post(ENDPOINT, newProduct);
      if (!response.ok) throw new Error("Falha ao adicionar produto");
      const addedProduct = response.body;
      setProducts((prev) => [...prev, addedProduct]);
      return addedProduct;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id, updatedProduct) => {
    setLoading(true);
    setError(null);
    try {
      const response = await APIClient.put(ENDPOINT, id, updatedProduct);
      if (!response.ok) throw new Error("Falha ao atualizar produto");
      const updated = response.body;
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await APIClient.delete(ENDPOINT, id);
      if (!response.ok) throw new Error("Falha ao deletar produto");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
