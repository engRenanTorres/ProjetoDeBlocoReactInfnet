import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.js";

function Navbar() {
  const navigate = useNavigate();

  const { currentUser, signout } = useContext(AuthContext);

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      signout();
    } catch (error) {
      alert(error);
      console.log(error);
    }
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
        {currentUser ? (
          <>
            <span>Olá, {currentUser}</span>
          </>
        ) : (
          <button onClick={handleLoginClick}>Login</button>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
