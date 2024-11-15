export const StarRating = ({ stars }: { stars: number }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 drop-shadow-sm">
        {Array.from({ length: stars }, (_, i) => (
          <i key={i} className="fa-solid fa-star text-2xl text-amber-300"></i>
        ))}
        {Array.from({ length: 5 - stars }, (_, i) => (
          <i
            key={stars + i}
            className="fa-solid fa-star text-2xl text-stone-400"
          ></i>
        ))}
      </div>
    </div>
  );
};
