import Carousel from "react-multi-carousel";
import { ItemCard } from "./ItemCard";
import { useEffect, useState } from "react";
import { IProduct } from "../universal/interfaces/IProduct";
import { Constants } from "../universal/Constants";

export const SimilarProducts = ({
  currentProduct,
  productType,
}: {
  currentProduct: number;
  productType: string;
}) => {
  const [products, setProducts] = useState<IProduct[]>(null);

  const fetchProducts = async () => {
    await fetch(
      `${Constants.API_URL}/products?product_type=${productType}`
    ).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setProducts(data.data);
        });
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      <div className="flex flex-col bg-light-gray p-8 rounded-md">
        <div className="flex place-items-center gap-6">
          <div className="grow h-[1px] bg-dark-brown" />
          <span className="text-3xl font-poppins font-bold text-dark-brown">
            Līdzīgi produkti
          </span>
          <div className="grow h-[1px] bg-dark-brown" />
        </div>
        {products && (
          <Carousel
            infinite={true}
            responsive={responsive}
            partialVisbile={false}
            renderButtonGroupOutside={true}
          >
            {products.map((item) => {
              if (item.id === currentProduct) return;
              return (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  images={item.images}
                  display_name={item.display_name}
                  description={item.description}
                  pricing={item.pricing}
                  discount_pricing={item.discount_pricing}
                  product_type={item.product_type}
                />
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
};
