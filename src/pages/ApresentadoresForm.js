import { useState } from "react";
import "./apresentadoresForm.css";
import { cepClient } from "../clients/cepClient.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button.js";
import InputField from "../components/InputField.js";
import * as zod from "zod";
import { Suspense } from "react";
import { regexCep } from "../utils/regex.js";
import { useLocation } from "react-router-dom";

// Esquema de validação com zod
const schema = zod.object({
  nome: zod.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: zod.string().email("Email inválido"),
  cep: zod
    .string()
    .regex(regexCep, "O cep deve ser no formato 0000-000 ou apenas numeros"),
  descricao: zod.string().optional(),
});

export default function ApresentadoresForm() {
  const location = useLocation();
  const dadosRecebidos = location.state;
  console.log(location);

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
  const [rua, setRua] = useState(dadosRecebidos?.rua ?? "");
  const [cidade, setCidade] = useState(dadosRecebidos?.cidade ?? "");

  const handleBlurCep = async (cepRecebido) => {
    const cep = cepRecebido.replace("-", "");
    console.log(cep);
    if (cep.length === 8) {
      try {
        const data = await cepClient(cep);
        if (data) {
          setRua(data.rua);
          setCidade(data.cidade);
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
          <InputField
            name="nome"
            label="Nome"
            {...register("nome")}
            error={errors?.nome?.message}
          />
          <InputField
            name="cep"
            label="Cep"
            {...register("cep")}
            onBlur={(e) => handleBlurCep(e.target.value)}
            error={errors?.cep?.message}
          />
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
        <Suspense>
          <Button className="form-button" label="Inserir" onClick={() => {}} />
        </Suspense>
      </form>
    </div>
  );
}
