import { useNavigate } from "react-router-dom";
import Button from "../components/Button.js";
import { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const titulo = "caderno";

  const handleClick = () => {
    setCount(count + 1);
  };
  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };
  const handleApresentadores = () => {
    () =>
      navigate(`/apresentadores/inserir`, {
        state: { rua: "Renan", cidade: "Niteroi" },
      });
  };
  return (
    <div className="home">
      <h1>Bem-vindo à Home</h1>
      <p>Esta é a página inicial do seu aplicativo de Vídeos.</p>
      {/* <Button label={count} onClick={handleClick}/> */}
      <Button label="Voltar" onClick={handleBack} />
      <Button label="Avançar" onClick={() => navigate(1)} />
      <button onClick={() => navigate(`/loja?titulo=${titulo}&price=${123}`)}>
        Passar Dados Para Loja
      </button>
      {/*<button
        onClick={() =>
          navigate(`/apresentadores/inserir/789`, {
            state: { rua: "Renan", cidade: "Niteroi" },
          })
        }
      >
        Passar Dados Para Loja
      </button>*/}
    </div>
  );
}

export default Home;
