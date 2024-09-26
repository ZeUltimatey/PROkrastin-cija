export const Category = ({ id }: { id: number }) => {
  const categoryBackgroundImages = [
    "/images/products/cat_food.png",
    "/images/products/cat_furniture.png",
    "/images/products/cat_tools.png",
    "/images/products/cat_toys.png",
  ];
  return (
    <div className="group w-64 h-64 hover:cursor-pointer">
      <div
        style={{ backgroundImage: `url(${categoryBackgroundImages[id]})` }}
        className="absolute z-0 shadow-md rounded-md group-hover:brightness-95 group-hover:blur-sm transition-all w-64 h-64 bg-center bg-cover"
      ></div>
      <span className="z-10 absolute w-64 h-64 text-center text-2xl font-bold select-none py-28 transition-all opacity-0 group-hover:opacity-100">
        <p className="text-content-white drop-shadow-xl">This is a category</p>
      </span>
    </div>
  );
};
