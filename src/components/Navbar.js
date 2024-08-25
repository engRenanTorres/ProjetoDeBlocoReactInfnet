import { Link, useNavigate } from "react-router-dom";

function Navbar({ nomeUsuario }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/videos">Videos</Link>
        </li>
        <li className="navbar-item">
          <Link to="/apresentadores/inserir">Novos Apresentadores</Link>
        </li>
        {/* Adicione outros links aqui */}
      </ul>
      <div className="navbar-item">
        {nomeUsuario ? (
          <span>Olá, {nomeUsuario}</span>
        ) : (
          <button onClick={handleLoginClick}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
