import { Navbar } from "../universal/Navbar";
import { Categories } from "./categories/Categories";
import { MainCard } from "./main-card/MainCard";
import { SpecialOffers } from "./special-offers/SpecialOffers";

export const Homepage = () => {
  return (
    <div
      className="h-auto lg:px-24 pt-6 
       bg-[#A57E63] "
    >
      <Navbar />
      <MainCard />
      <SpecialOffers />
    </div>
  );
};
