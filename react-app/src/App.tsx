import { Homepage } from "./components/homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/Login";
import { ProductView } from "./components/product/ProductView";
import "react-multi-carousel/lib/styles.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productview" element={<ProductView/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
