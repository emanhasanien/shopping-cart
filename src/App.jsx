import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import AuthWrapper from "./AuthWrapper";
import Cart from "./Components/Cart";

const App = () => {
    const location = useLocation();

  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
    {!hideNavbar && <Navbar /> }
      

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={
            <AuthWrapper>
              <Home />
            </AuthWrapper>
          }
        />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
