import { ItemCard } from "../ItemCard";
import catItems from "../../../data/cat_items.json";
import { useState } from "react";
import Carousel from "react-multi-carousel";

export const SpecialOffers = () => {
  const [startItem, setStartItem] = useState(0);

  const items = catItems.map((item) => (
    <ItemCard
      key={item.id}
      id={item.id}
      title={item.title}
      description={item.description}
      price={item.price}
    />
  ));

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="p-12 bg-[#EDEAE1] h-auto flex flex-col gap-8">
      <h1 className="text-3xl font-poppins font-bold">Īpašie piedāvājumi</h1>
      <div className="flex place-items-center justify-center gap-8">
        <div className="">
          <Carousel responsive={responsive}>
            {catItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
