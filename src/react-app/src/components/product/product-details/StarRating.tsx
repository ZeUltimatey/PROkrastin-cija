export const StarRating = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <i className="fa-solid fa-star text-2xl lg:text-3xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl lg:text-3xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl lg:text-3xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl lg:text-3xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl lg:text-3xl text-stone-400"></i>
      </div>
      <div className="text-sm lg:text-md ml-2 font-semibold text-stone-800">
        52 atsauksmes
      </div>
    </div>
  );
};
