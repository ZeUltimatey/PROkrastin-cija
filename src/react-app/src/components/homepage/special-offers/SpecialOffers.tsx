import { ItemCard } from "../ItemCard";
import catItems from "../../../data/cat_items.json";
import { useState } from "react";
import Carousel from "react-multi-carousel";

export const SpecialOffers = () => {
  const [startItem, setStartItem] = useState(0);

  const items = catItems
    //.slice(startItem, startItem + 5)
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="p-12 bg-[#EDEAE1] h-auto">
      <div className="flex flex-col gap-6 bg-[#E1DED6] p-8 rounded-md">
        <div className="flex place-items-center gap-6">
          <div className="grow h-[1px] bg-[#3e2a19]" />
          <span className="text-3xl font-poppins font-semibold">
            Īpašie piedāvājumi
          </span>
          <div className="grow h-[1px] bg-[#3e2a19]" />
        </div>
        <div className="px-12">
          <Carousel
            swipeable={false}
            draggable={false}
            infinite={true}
            responsive={responsive}
          >
            {items}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
