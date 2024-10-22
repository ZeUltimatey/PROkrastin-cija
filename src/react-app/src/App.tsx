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
import { Products } from "./components/panel/admin-panel/Products";
import { Cart } from "./components/cart/Cart";
import { ToastProvider } from "./components/universal/Toast";
import { Reviews } from "./components/product/Reviews";
import { Receipt } from "./components/receipt/Receipt";
import { Breeds } from "./components/about/Breeds";
import { BreedDetails } from "./components/about/BreedDetails";
import { Encyclopedia } from "./components/panel/admin-panel/Encyclopedia";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<GeneralLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/product/:productId" element={<ProductView />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/contact" element={<ContactInfo />} />
            <Route path="/panel/users" element={<Users />} />
            <Route path="/panel/orders" element={<Orders />} />
            <Route path="/panel/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/breeds" element={<Breeds />} />
            <Route path="/breed/:breedId" element={<BreedDetails />} />
            <Route path="/panel/encyclopedia" element={<Encyclopedia />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/catalog/cats" element={<Homepage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
