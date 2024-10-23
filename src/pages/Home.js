import Button from "../components/Button.js";
import {useState} from "react";

function Home() {
  const [count,setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  }
  return (
    <div className="home">
      <h1>Bem-vindo à Home</h1>
      <p>Esta é a página inicial do seu aplicativo de Vídeos.</p>
      <Button label={count} onClick={handleClick}/>
    </div>
  );
}

export default Home;
