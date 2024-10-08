import { Homepage } from "./components/homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { ProductView } from "./components/product/ProductView";
import { Catalog } from "./components/catalog/Catalog";
import { GeneralLayout } from "./components/layouts/GeneralLayout";
import { Profile } from "./components/profile/Profile";
import { Panel } from "./components/panel/Panel";
import { Policy } from "./components/policy/Policy";
import { ContactInfo } from "./components/contact/Contact";
import { Users } from "./components/panel/admin-panel/Users";
import { Orders } from "./components/panel/admin-panel/Orders";
import { AuthLayout } from "./components/layouts/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/productview" element={<ProductView />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="panel" element={<Panel />} />
          <Route path="policy" element={<Policy />} />
          <Route path="contact" element={<ContactInfo />} />
          <Route path="/panel/users" element={<Users />} />
          <Route path="/panel/orders" element={<Orders />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/catalog/cats" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
