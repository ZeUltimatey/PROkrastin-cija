import { useNavigate } from "react-router-dom";

export const StarRating = () => {
  const navigate = useNavigate();

  const handleNavigateToReviews = () => {
    navigate("/reviews");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 drop-shadow-sm">
        <i className="fa-solid fa-star text-2xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl text-amber-300"></i>
        <i className="fa-solid fa-star text-2xl text-stone-400"></i>
      </div>
      <div
        onClick={handleNavigateToReviews}
        className="text-sm ml-1 font-poppins underline text-dark-brown hover:cursor-pointer"
      >
        52 atsauksmes
      </div>
    </div>
  );
};
