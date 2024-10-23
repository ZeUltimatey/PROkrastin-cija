import { useState } from "react";

export const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleRatingChange = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const toggleAnonymous = () => {
    setIsAnonymous((prev) => !prev);
  };

  return (
    <div className="bg-content-white p-4 ">
      <div className="absolute top-4 left-4 cursor-pointer"></div>
      <i className="fa-solid fa-arrow-left text-2xl text-dark-brown"></i>

      <div className="flex items-center gap-6 mb-6">
        <img
          src={"../images/products/cat_food.png"}
          className="rounded-md h-56 w-56 object-cover shadow-md"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl font-poppins mb-2 text-dark-brown">
            Kaķu barība 1kg
          </h2>
          <p className="text-dark-brown">Labākais kaķu ēdiens rajonā.</p>
        </div>
      </div>

      <h2 className="text-2xl font-poppins mb-4 text-dark-brown">Atsauksmes</h2>

      <div className="mb-6">
        <div className="border-b pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Anna</span>
            <div className="flex">
              <i className="fa-solid fa-star text-lg text-amber-300"></i>
              <i className="fa-solid fa-star text-lg text-amber-300"></i>
              <i className="fa-solid fa-star text-lg text-amber-300"></i>
              <i className="fa-solid fa-star text-lg text-amber-300"></i>
              <i className="fa-solid fa-star text-lg text-stone-400"></i>
            </div>
          </div>
          <p className="text-dark-brown">Zbisā barība, vīram ļoti garšoja.</p>
        </div>
        <hr className="my-4 border-t border-dark-brown" />
        <div className="border-b pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Jančiks</span>
            <div className="flex">
              <i className="fa-solid fa-star text-lg text-amber-300"></i>
              <i className="fa-solid fa-star text-lg text-amber-300"></i>
              <i className="fa-solid fa-star text-lg text-amber-300"></i>
              <i className="fa-solid fa-star text-lg text-amber-300"></i>
              <i className="fa-solid fa-star text-lg text-amber-300"></i>
            </div>
          </div>
          <p className="text-dark-brown">Ļoti laba pārtika, pērku regulāri.</p>
        </div>
        <hr className="my-4 border-t border-dark-brown" />
      </div>

      <h3 className="text-xl font-poppins mb-2">Atstāj savu atsauksmi</h3>

      <form className="flex flex-col gap-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tavs komentārs"
          className="border p-2 rounded-md"
        ></textarea>

        <div className="flex items-center gap-2">
          <span>Novērtējums:</span>
          <div className="flex">
            {[...Array(5)].map((_, starIndex) => (
              <i
                key={starIndex}
                onClick={() => handleRatingChange(starIndex)}
                className={`fa-solid fa-star text-2xl cursor-pointer ${
                  starIndex < rating ? "text-amber-300" : "text-stone-400"
                }`}
              ></i>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span>Pievienot atsauksmi anonīmi:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={toggleAnonymous}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-dark-gray rounded-full peer dark:bg-dark-brown peer-checked:after:translate-x-full peer-checked:after:border-content-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-content-white after:border-dark-brown after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-light-brown"></div>
          </label>
        </div>

        <button
          type="button"
          className="bg-light-brown text-white font-poppins py-2 rounded-md hover:bg-medium-brown"
        >
          Iesniegt atsauksmi
        </button>
      </form>
    </div>
  );
};
