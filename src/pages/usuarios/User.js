import React, { useState, useEffect } from "react";
import "./User.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users", {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error("Falha ao buscar usuários");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Requisição abortada");
        } else {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    fetchUsers();
    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) return <div className="user-list__loading">Carregando...</div>;
  if (error) return <div className="user-list__error">Erro: {error}</div>;

  return (
    <div className="user-list">
      <h1 className="user-list__title">Usuários da FakeStore API</h1>
      <table className="user-list__table">
        <thead>
          <tr>
            <th className="user-list__table-header">ID</th>
            <th className="user-list__table-header">Nome</th>
            <th className="user-list__table-header">Email</th>
            <th className="user-list__table-header">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="user-list__table-row">
              <td className="user-list__table-cell">{user.id}</td>
              <td className="user-list__table-cell">{`${user.name.firstname} ${user.name.lastname}`}</td>
              <td className="user-list__table-cell">{user.email}</td>
              <td className="user-list__table-cell">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
