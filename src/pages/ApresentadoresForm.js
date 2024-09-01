import { useState } from "react";
import "./apresentadoresForm.css";
import { cepClient } from "../clients/cepClient.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Esquema de validação com zod
const schema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  cep: z
    .string()
    .regex(
      /^\d{8}|^\d{5}-\d{3}$/,
      "O cep deve ser no formato 0000-000 ou apenas numeros"
    ),
  descricao: z.string().optional(),
});

export default function ApresentadoresForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");

  const handleBlurCep = async () => {
    const cep = watch("cep").replace("-", "");
    if (cep.length === 8) {
      try {
        const data = await cepClient(cep);
        if (data) {
          setRua(data.street); // Ajuste para o nome correto do campo de retorno
          setCidade(data.neighborhood); // Ajuste para o nome correto do campo de retorno
        } else {
          alert("CEP não encontrado!");
        }
      } catch (error) {
        alert("Erro ao buscar CEP: " + error.message);
        console.error(error);
      }
    } else {
      alert("CEP inválido");
    }
  };

  const onSubmit = (e) => {
    console.log("Dados do formulario: ", formData);
    setFormData({
      nome: "",
      email: "",
      cep: "",
      descricao: "",
    });
  };

  return (
    <div className="form-container">
      <h1>Inscrição Apresentadores</h1>
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="registration-input-list">
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" {...register("nome")} />
            {errors.nome && (
              <span className="error">{errors.nome.message}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" {...register("email")} />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              {...register("cep")}
              onBlur={handleBlurCep}
            />
            {errors.cep && <span className="error">{errors.cep.message}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="descricao">Descrição</label>
            <input type="text" id="descricao" {...register("descricao")} />
          </div>
          <div className="input-group">
            <label htmlFor="rua">Rua</label>
            <input type="text" id="rua" value={rua} readOnly />
          </div>
          <div className="input-group">
            <label htmlFor="cidade">Cidade</label>
            <input type="text" id="cidade" value={cidade} readOnly />
          </div>
        </div>
        <button className="form-button">Inserir</button>
      </form>
    </div>
  );
}
