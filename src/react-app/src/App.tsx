import { Homepage } from "./components/homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { ProductView } from "./components/product/ProductView";
import { Catalog } from "./components/catalog/Catalog";
import { GeneralLayout } from "./components/layouts/GeneralLayout";
import { PanelLayout } from "./components/layouts/PanelLayout";
import { Profile } from "./components/profile/Profile";
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
import { BreedCatalog } from "./components/about/BreedCatalog";
import { BreedDetails } from "./components/about/BreedDetails";
import { Encyclopedia } from "./components/panel/admin-panel/Encyclopedia";
import { CartProvider } from "./components/universal/Cart";
import { Statistics } from "./components/panel/admin-panel/Statistics";
import { ConfirmationProvider } from "./components/universal/Confirmation";
import { Cats } from "./components/panel/admin-panel/Cats";
import { Breeds } from "./components/panel/admin-panel/Breeds";
import { ProfileSettings } from "./components/instruction/ProfileSettings";
import { BuyInfo } from "./components/instruction/BuyInfo";
import { ContactUse } from "./components/instruction/ContactUse";
import { EncyclopediaUse } from "./components/instruction/EncyclopediaUse";
import { ProfileEdit } from "./components/instruction/ProfileEdit";
import { OrderHistory } from "./components/instruction/OrderHistory";
import { SavedAddresses } from "./components/instruction/SavedAddresses";
import { PayMethods } from "./components/instruction/PayMethods";
import { BrowseInfo } from "./components/instruction/BrowseInfo";
import { BasketInfo } from "./components/instruction/BasketInfo";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ConfirmationProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<GeneralLayout />}>
                <Route index element={<Homepage />} />
                <Route path="/product/:productId" element={<ProductView />} />
                <Route path="/products" element={<Catalog />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/contact" element={<ContactInfo />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/receipt" element={<Receipt />} />
                <Route path="/breeds" element={<BreedCatalog />} />
                <Route path="/breed/:breedId" element={<BreedDetails />} />
                <Route
                  path="/instruction/encyclopediause"
                  element={<EncyclopediaUse />}
                />
                <Route
                  path="/instruction/profilesettings"
                  element={<ProfileSettings />}
                />
                <Route
                  path="/instruction/basketinfo"
                  element={<BasketInfo />}
                />
                <Route
                  path="/instruction/browseinfo"
                  element={<BrowseInfo />}
                />

                <Route path="/instruction/buyinfo" element={<BuyInfo />} />
                <Route
                  path="/instruction/contactuse"
                  element={<ContactUse />}
                />
                <Route
                  path="/instruction/profileedit"
                  element={<ProfileEdit />}
                />
                <Route
                  path="/instruction/orderhistory"
                  element={<OrderHistory />}
                />
                <Route
                  path="/instruction/savedaddresses"
                  element={<SavedAddresses />}
                />
                <Route
                  path="/instruction/paymethods"
                  element={<PayMethods />}
                />
              </Route>

              <Route path="/panel" element={<PanelLayout />}>
                <Route path="/panel/statistics" element={<Statistics />} />
                <Route path="/panel/users" element={<Users />} />
                <Route path="/panel/orders" element={<Orders />} />
                <Route path="/panel/products" element={<Products />} />
                <Route path="/panel/cats" element={<Cats />} />
                <Route path="/panel/breeds" element={<Breeds />} />
                <Route path="/panel/encyclopedia" element={<Encyclopedia />} />
              </Route>

              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="/catalog/cats" element={<Homepage />} />
            </Routes>
          </CartProvider>
        </ConfirmationProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
