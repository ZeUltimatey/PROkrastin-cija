import { Navbar } from "../universal/Navbar";
import { Categories } from "./categories/Categories";
import { MainCard } from "./main-card/MainCard";
import { SpecialOffers } from "./special-offers/SpecialOffers";

export const Homepage = () => {
  return (
    <div
      className="h-auto lg:px-24 pt-6 
       bg-[#967a67] "
    >
      <Navbar />
      <MainCard />
      <SpecialOffers />
      <Categories />
    </div>
  );
};
