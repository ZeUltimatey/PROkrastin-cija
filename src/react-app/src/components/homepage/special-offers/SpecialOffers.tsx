import { ItemCard } from "../../product/ItemCard";
import catItems from "../../../data/cat_items.json";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import { Product } from "../../universal/interfaces/Product";
import { Constants } from "../../universal/Constants";

export const SpecialOffers = () => {
  const [discountItems, setDiscountItems] = useState<Product[]>(null);

  const getDiscountItems = async () => {
    await fetch(`${Constants.API_URL}/products`);
  };

  const items = catItems
    //.slice(startItem, startItem + 5)
    .map((item) => (
      <ItemCard
        key={item.id}
        id={item.id}
        image_url={item.image_url ?? "../car.png"}
        display_name={item.title}
        description={item.description}
        pricing={item.price}
        product_type={item.category}
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
    <div className="p-12 bg-content-white h-auto">
      <div className="flex flex-col gap-6 bg-light-gray p-8 rounded-md">
        <div className="flex place-items-center gap-6">
          <div className="grow h-[1px] bg-dark-brown" />
          <span className="text-3xl font-poppins font-bold text-dark-brown">
            Īpašie piedāvājumi
          </span>
          <div className="grow h-[1px] bg-dark-brown" />
        </div>
        <div className="">
          <Carousel
            infinite={true}
            responsive={responsive}
            partialVisbile={false}
            renderButtonGroupOutside={true}
          >
            {items}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
