import { Outlet } from "react-router-dom";
import { Navbar } from "../universal/Navbar";
import { Footer } from "../universal/Footer";

export const GeneralLayout = () => {
  return (
    <div className="" style={{ backgroundImage: `url(../cat_pattern_bg.jpg)` }}>
      <div className="lg:px-32 bg-background-brown bg-opacity-95 lg:pt-6">
        <Navbar />

        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
