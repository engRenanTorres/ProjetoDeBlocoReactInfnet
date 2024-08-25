import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import LayoutPadrao from "./containers/LayoutPadrao";
import Home from "./pages/Home";
import Videos from "./pages/videos/Videos";
import ApresentadoresForm from "./pages/ApresentadoresForm";
import Login from "./pages/Login";

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
