import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function LayoutPadrao() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LayoutPadrao;
