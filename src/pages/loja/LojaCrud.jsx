import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { APIClient } from "../../clients/apiClient";

const LojaCRUD = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", price: "" });
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await APIClient.get("/products");
      if (!response.ok) {
        throw new Error("Falha ao buscar Produtos");
      }
      setItems(response.body);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = async () => {
    setLoading(true);
    try {
      const response = await APIClient.post("/products", newItem);
      if (!response.ok) {
        throw new Error("Falha ao criar Produtos");
      }
      setItems((prev) => [...prev, response.body]);
      setNewItem({ title: "", price: "" });
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async () => {
    setLoading(true);
    try {
      const response = await APIClient.put(
        "/products",
        editingItem.id,
        newItem
      );

      const updatedItem = await response.body;
      setItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? updatedItem : item))
      );
      setEditingItem(null);
      setNewItem({ title: "", price: "" });
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    } finally {
      setLoading(false);
    }
  };
  const startEditing = (item) => {
    setEditingItem(item);
    setNewItem({ title: item.title, price: item.price });
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Falha ao criar Produtos");
      }
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      setError(error.message);
    }
  };

  if (loading) return <div className="user-list__loading">Carregando...</div>;
  if (error) return <div className="user-list__error">Erro: {error}</div>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        CRUD de Itens da Loja
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TextField
          name="title"
          label="Título do item"
          value={newItem.title}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <TextField
          name="price"
          label="Preço"
          type="number"
          value={newItem.price}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          onClick={editingItem ? updateItem : addItem}
        >
          {editingItem ? "Atualizar" : "Adicionar"}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => startEditing(item)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteItem(item.id)}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LojaCRUD;
