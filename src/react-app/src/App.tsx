import { Homepage } from "./components/homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { ProductView } from "./components/product/ProductView";
import "react-multi-carousel/lib/styles.css";
import { Catalog } from "./components/catalog/Catalog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productview" element={<ProductView />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/cats" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
