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
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

const LojaCRUD = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const titulo = searchParams.get("titulo");
  const price = searchParams.get("price");

  const [newItem, setNewItem] = useState({
    title: titulo ?? "",
    price: price ?? "",
  });
  const [editingItem, setEditingItem] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async () => {
    if (editingItem) {
      await updateProduct(editingItem.id, newItem);
      setEditingItem(null);
    } else {
      await addProduct(newItem);
    }
    setNewItem({ title: "", price: "" });
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setNewItem({ title: item.title, price: item.price });
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
        <Button variant="contained" onClick={handleAddOrUpdate}>
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
            {products.map((item) => (
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
                    onClick={() => deleteProduct(item.id)}
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
