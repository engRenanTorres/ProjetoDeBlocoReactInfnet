import { useEffect, useState } from "react";
import "./apresentadoresForm.css";
import { cepClient } from "../clients/cepClient.js";

export default function ApresentadoresForm() {
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cep: "",
    descricao: "",
  });

  const [erros, setErros] = useState({});

  const handleChance = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErros({
      ...erros,
      [e.target.name]: "",
    });
  };

  const handleOnBlur = () => {
    const newErros = validateForm();
    if (Object.keys(newErros).length > 0) {
      setErros(newErros);
    }
  };

  const handleBlurCep = async () => {
    handleOnBlur();
    const cep = formData.cep.replace("-", "");
    try {
      const dados = await cepClient(cep);
      console.log("data", dados);
      if (dados) {
        setRua(dados.rua);
        setCidade(dados.cidade);
      } else {
        alert("CEP não encontrado!");
      }
    } catch (error) {
      alert("Erro ao buscar CEP" + error.message);
      console.error(error);
    }
  };

  const validateForm = () => {
    const newErros = {};

    if (formData.nome.length < 3)
      newErros.nome = "O nome deve ter pelo menos 3 caracteres";
    if (!formData.email) newErros.email = "O email é obrigatório";
    if (!formData.cep.match(/^\d{8}|^\d{5}-\d{3}$/))
      newErros.cep = "O cep deve ser no formato 0000-000 ou apenas numeros";

    return newErros;
  };

  useEffect(() => {});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErros = validateForm();
    if (Object.keys(newErros).length > 0) {
      setErros(newErros);
    } else {
      console.log("Dados do formulario: ", formData);
      setFormData({
        nome: "",
        email: "",
        cep: "",
        descricao: "",
      });
    }
  };

  return (
    <div className="form-container">
      <h1>Inscrição Apresentadores</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="registration-input-list">
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              onChange={handleChance}
              onBlur={handleOnBlur}
              value={formData.nome}
            />
            {erros.nome && <span className="error">{erros.nome}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChance}
              value={formData.email}
            />
            {erros.email && <span className="error">{erros.email}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              name="cep"
              onChange={handleChance}
              onBlur={handleBlurCep}
              value={formData.cep}
            />
          </div>
          {erros.cep && <span className="error">{erros.cep}</span>}
          <div className="input-group">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              onChange={handleChance}
              value={formData.descricao}
            />
          </div>
          {erros.descricao && <span className="error">{erros.descricao}</span>}
          <div className="input-group">
            <label htmlFor="rua">Rua</label>
            <input
              type="text"
              id="rua"
              name="rua"
              onChange={handleChance}
              value={rua}
            />
          </div>
          <div className="input-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              disabled
              type="text"
              id="cidade"
              name="cidade"
              onChange={handleChance}
              value={cidade}
            />
          </div>
        </div>
        <button className="form-button">Inserir</button>
      </form>
    </div>
  );
}
