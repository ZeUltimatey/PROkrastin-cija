import { ItemCard } from "../ItemCard";
import catItems from "../../../data/cat_items.json";
import { useState } from "react";

export const SpecialOffers = () => {
  const [startItem, setStartItem] = useState(0);

  const items = catItems
    .slice(startItem, startItem + 5)
    .map((item) => (
      <ItemCard
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        price={item.price}
      />
    ));

  const incrementStartItem = () => {
    console.log(startItem);
    if (catItems.length > startItem + 5) {
      setStartItem(startItem + 1);
    } else {
      setStartItem(0);
    }
  };

  const decrementStartItem = () => {
    if (startItem !== 0) {
      setStartItem(startItem - 1);
    } else {
      setStartItem(catItems.length - 5);
    }
  };

  return (
    <div className="p-12 bg-[#EDEAE1] h-auto flex flex-col gap-8">
      <h1 className="text-4xl font-poppins font-bold">Īpašie piedāvājumi</h1>
      <div className="flex place-items-center justify-center gap-6">
        <div
          onClick={decrementStartItem}
          className="bg-[#F3C9B1] py-1 px-3 shadow-sm rounded-full hover:brightness-90 hover:cursor-pointer"
        >
          <i className="fa-solid fa-chevron-left text-2xl"></i>
        </div>
        <div className="flex gap-12 place-items-center">{items}</div>
        <div
          onClick={incrementStartItem}
          className="bg-[#F3C9B1] py-1 px-3 shadow-sm rounded-full hover:brightness-90 hover:cursor-pointer"
        >
          <i className="fa-solid fa-chevron-right text-2xl"></i>
        </div>
      </div>
    </div>
  );
};
