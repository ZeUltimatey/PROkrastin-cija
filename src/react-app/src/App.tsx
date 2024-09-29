import { Homepage } from "./components/homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { ProductView } from "./components/product/ProductView";
import "react-multi-carousel/lib/styles.css";
import { Catalog } from "./components/catalog/Catalog";
import { GeneralLayout } from "./components/layouts/GeneralLayout";
import { LoginLayout } from "./components/layouts/LoginLayout";
import { Profile } from "./components/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/productview" element={<ProductView />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/auth" element={<LoginLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/catalog/cats" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
