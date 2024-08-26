import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.js";

function LayoutPadrao() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LayoutPadrao;
