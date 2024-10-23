import React, { useState, useEffect } from 'react';
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
  Box
} from '@mui/material';

const LojaCRUD = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', price: '' });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const addItem = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setItems(prev => [...prev, data]);
      setNewItem({ title: '', price: '' });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setNewItem({ title: item.title, price: item.price });
  };

  const updateItem = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${editingItem.id}`, {
        method: 'PUT',
        body: JSON.stringify(newItem),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const updatedItem = await response.json();
      setItems(prev => prev.map(item => item.id === editingItem.id ? updatedItem : item));
      setEditingItem(null);
      setNewItem({ title: '', price: '' });
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE'
      });
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

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
          {editingItem ? 'Atualizar' : 'Adicionar'}
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
            {items.map(item => (
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