export const StarRating = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 drop-shadow-sm">
        <i className="fa-solid fa-star text-2xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl text-stone-400"></i>
      </div>
      <div className="text-sm ml-1 font-poppins text-dark-brown ">
        52 atsauksmes
      </div>
    </div>
  );
};
