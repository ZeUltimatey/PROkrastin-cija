import { useEffect, useState } from "react";
import { ProductInfo } from "./product-details/ProductInfo";
import { ProductSpecification } from "./product-details/ProductSpecification";
import { useParams } from "react-router-dom";
import { Constants } from "../universal/Constants";
import { IProduct } from "../universal/interfaces/IProduct";

export const ProductView = () => {
  const [product, setProduct] = useState<IProduct>(null);

  const { productId } = useParams();

  const getProduct = async () => {
    await fetch(`${Constants.API_URL}/products/${productId}`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setProduct(data.data);
      }
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="h-screen bg-content-white py-4 px-8">
      {product && (
        <div className="bg-[#eaded2] mt-4 py-12 rounded-md">
          <div className="flex flex-col lg:flex-row gap-12 px-12">
            <img
              src={product?.image_url}
              alt="product"
              className="rounded-md h-[400px] w-[700px] object-cover shadow-md"
            />
            <ProductInfo product={product} />
          </div>
        </div>
      )}
      {product && <ProductSpecification />}
    </div>
  );
};
