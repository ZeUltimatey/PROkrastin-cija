export const Category = ({ id }: { id: number }) => {
  const categoryBackgroundImages = [
    "/images/products/cat_food.png",
    "/images/products/cat_furniture.png",
    "/images/products/cat_tools.png",
    "/images/products/cat_toys.png",
  ];
  return (
    <div className="group h-full]">
      <img
        src={categoryBackgroundImages[id]}
        className="shadow-md rounded-md "
      />
      <div></div>
    </div>
  );
};
