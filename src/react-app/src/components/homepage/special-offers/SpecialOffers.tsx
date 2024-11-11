import { ItemCard } from "../../product/ItemCard";
import catItems from "../../../data/cat_items.json";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Constants } from "../../universal/Constants";
import { IProduct } from "../../universal/interfaces/IProduct";
import { Spinner } from "../../universal/Spinner";

export const SpecialOffers = () => {
  const [discountItems, setDiscountItems] = useState<IProduct[]>(null);

  const getDiscountItems = async () => {
    await fetch(`${Constants.API_URL}/products`).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setDiscountItems(data.data);
      }
    });
  };

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

  useEffect(() => {
    getDiscountItems();
  }, []);

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
        <div className="text-center font-poppins">
          {discountItems === null && <Spinner />}
          {discountItems?.filter((item) => item.discount_pricing).length ===
            0 && <div>Diemžēl šobrīd nav neviena īpašā piedāvājuma. :(</div>}
        </div>
        {discountItems && (
          <div className="">
            <Carousel
              infinite={true}
              responsive={responsive}
              partialVisbile={false}
              renderButtonGroupOutside={true}
            >
              {discountItems.map((item) => {
                if (item.discount_pricing)
                  return (
                    <ItemCard
                      key={item.id}
                      id={item.id}
                      image_url={item.image_url ?? "../images/products/9.png"}
                      display_name={item.display_name}
                      description={item.description}
                      pricing={item.pricing}
                      discount_pricing={item.discount_pricing}
                      product_type={item.product_type}
                    />
                  );
              })}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};
