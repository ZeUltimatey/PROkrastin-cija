import { useEffect, useState } from "react";
import { ProductInfo } from "./product-details/ProductInfo";
import { useParams } from "react-router-dom";
import { Constants } from "../universal/Constants";
import { IProduct } from "../universal/interfaces/IProduct";
import Carousel from "react-multi-carousel";
import { SimilarProducts } from "./SimilarProducts";

export const ProductView = () => {
  const [product, setProduct] = useState<IProduct>(null);
  const [reviews, setReviews] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const { productId } = useParams();

  const getProduct = async () => {
    await fetch(`${Constants.API_URL}/products/${productId}`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setProduct(data.data);
        console.log(data.data);
      }
    });
  };

  const getReviews = async () => {
    await fetch(`${Constants.API_URL}/reviews/${productId}`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    });
  };

  useEffect(() => {
    getProduct();
    getReviews();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const goToNextImage = () => {
    if (currentImage === product.images.length - 1) {
      setCurrentImage(0);
      return;
    }
    setCurrentImage(currentImage + 1);
  };

  const goToPreviousImage = () => {
    if (currentImage === 0) {
      setCurrentImage(product.images.length - 1);
      return;
    }
    setCurrentImage(currentImage - 1);
  };

  return (
    <div className="bg-content-white lg:py-4 py-1 lg:px-8 min-h-screen">
      <div className="bg-[#eaded2] mt-4 py-12 rounded-md">
        {product && reviews && (
          <div className="flex flex-col lg:flex-row gap-12 px-12">
            {product.images?.length > 0 ? (
              <div className="">
                {product.images.length > 1 && (
                  <div>
                    <button
                      onClick={goToPreviousImage}
                      className="rounded-full absolute py-2 px-4 bg-accent-brown shadow-md m-2 hover:opacity-90 hover:cursor-pointer"
                    >
                      <i className="fa-solid fa-angle-left text-dark-brown"></i>
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="rounded-full absolute py-2 px-4 bg-accent-brown shadow-md m-2 ml-16 hover:opacity-90 hover:cursor-pointer"
                    >
                      <i className="fa-solid fa-angle-right text-dark-brown"></i>
                    </button>
                  </div>
                )}
                <img
                  key={product.id}
                  src={Constants.BASE_URL + product.images[currentImage].url}
                  alt="product"
                  className="rounded-md h-[400px] w-[700px] object-cover shadow-md"
                />
              </div>
            ) : (
              <img
                src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                alt="product"
                className="rounded-md h-[400px] w-[700px] object-cover shadow-md"
              />
            )}
            <ProductInfo product={product} reviews={reviews} />
          </div>
        )}
      </div>
      {product && (
        <SimilarProducts
          currentProduct={product.id}
          productType={product.product_type}
        />
      )}
    </div>
  );
};
