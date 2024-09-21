export const ProductImage = () => {
  return (
    <div className="w-full lg:w-1/2 flex justify-center">
      <img
        src={"../car.png"}
        alt="product"
        className="rounded-t-md w-full h-auto lg:h-96 lg:w-96 object-cover shadow-md"
      />
    </div>
  );
};