import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import LayoutPadrao from "./containers/LayoutPadrao.js";
import Home from "./pages/Home.js";
import Videos from "./pages/videos/Videos.js";
import ApresentadoresForm from "./pages/ApresentadoresForm.js";
import Login from "./pages/Login.js";

export default function AppRouter() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LayoutPadrao />}>
            <Route index element={<Home />} />
            <Route path="videos" element={<Videos />} />
            <Route path="apresentadores" element={<Outlet />}>
              <Route path="inserir" element={<ApresentadoresForm />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
