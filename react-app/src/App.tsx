import { Homepage } from "./components/homepage/Homepage";
<<<<<<< Updated upstream
import { ProductView } from "./components/product/ProductView";

function App() {
  return (
    <>
      <ProductView />
    </>
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
>>>>>>> Stashed changes
  );
}

export default App;
