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
        imageurl={item.image_url ?? "../car.png"}
        title={item.title}
        description={item.description}
        price={item.price}
        category={item.category.toUpperCase()}
      />
    ));

  const incrementStartItem = () => {
    console.log(startItem);
    if (catItems.length > startItem + 5) {
      setStartItem(startItem + 1);
    }
  };

  const decrementStartItem = () => {
    if (startItem !== 0) {
      setStartItem(startItem - 1);
    }
  };

  return (
    <div className="p-12 bg-[#EDEAE1] h-auto">
      <div className="flex flex-col gap-6 bg-[#eaded2] p-8 rounded-md">
        <div className="flex place-items-center gap-6">
          <div className="grow h-[1px] bg-[#3e2a19]" />
          <span className="text-3xl font-poppins font-semibold">
            Īpašie piedāvājumi
          </span>
          <div className="grow h-[1px] bg-[#3e2a19]" />
        </div>
        <div className="flex place-items-center justify-center gap-4">
          <div
            onClick={decrementStartItem}
            className="bg-[#D8C5B3] py-1 px-3 shadow-sm rounded-full hover:brightness-90 hover:cursor-pointer"
          >
            <i className="text-[#3e2a19] brightness-105 fa-solid fa-chevron-left text-2xl"></i>
          </div>
          <div className="flex gap-12 place-items-center">{items}</div>
          <div
            onClick={incrementStartItem}
            className="bg-[#D8C5B3] py-1 px-3 shadow-sm rounded-full hover:brightness-90 hover:cursor-pointer"
          >
            <i className="text-[#3e2a19] brightness-105 fa-solid fa-chevron-right text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
