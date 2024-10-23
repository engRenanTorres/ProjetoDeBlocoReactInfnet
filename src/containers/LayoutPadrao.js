import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.js";

function LayoutPadrao() {
  return (
    <>
      <Navbar nomeUsuario="" />
      <Outlet />
    </>
  );
}

export default LayoutPadrao;
