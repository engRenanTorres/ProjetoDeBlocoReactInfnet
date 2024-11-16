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
import NotFound from "./pages/NotFound.js";
import UserList from "./pages/usuarios/User.js";
import LojaCRUD from "./pages/loja/LojaCrud.jsx";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./contexts/ThemeContext.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import PrivateRoutes from "./utils/PrivateRoutes2.js";

const LojaCRUDLazy = lazy(() => import("./pages/loja/LojaCrud.jsx"));

export default function AppRouter() {
  return (
    <div className="App">
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<LayoutPadrao />}>
                  <Route index element={<Home />} />
                  <Route path="videos" element={<Videos />} />
                  <Route path="apresentadores" element={<Outlet />}>
                    <Route index element={<UserList />} />
                    <Route path="inserir" element={<ApresentadoresForm />} />
                  </Route>
                  <Route element={<PrivateRoutes />}>
                    <Route path="loja" element={<Outlet />}>
                      <Route index element={<LojaCRUDLazy />} />
                    </Route>
                  </Route>
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}
