import { Footer } from "../universal/Footer";
import { Navbar } from "../universal/Navbar";
import { Categories } from "./categories/Categories";
import { MainCard } from "./main-card/MainCard";
import { SpecialOffers } from "./special-offers/SpecialOffers";

export const Homepage = () => {
  return (
    <div style={{ backgroundImage: `url(../cat_pattern_bg.jpg)` }} className="">
      <div className="lg:px-32 pt-6 bg-background-brown bg-opacity-95">
        <Navbar />
        <MainCard />
        <SpecialOffers />
        <Categories />
        <Footer />
      </div>
    </div>
  );
};
