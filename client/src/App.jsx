import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import PrivateRoute from "./guards/PrivateRoute";
import OpenRoute from "./guards/OpenRoute";
import AuthSuccess from "./pages/AuthSuccess";
import Error from "./components/Error";

function App() {
  return (
    <div className="w-screen min-h-screen overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <Home />
            </OpenRoute>
          }
        />

        <Route
          path="/auth-success"
          element={
            <OpenRoute>
              <AuthSuccess />
            </OpenRoute>
          }
        />

        <Route
          path="/my-todos"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
