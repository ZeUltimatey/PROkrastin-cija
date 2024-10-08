export const CategoryItem = ({ item }: { item: string }) => {
  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        id={item}
        name={item}
        value={item}
        className="w-0 opacity-0 absolute"
      />
      <label
        htmlFor={item}
        className={`text-dark-brown font-poppins font-semibold border-gray-300 border-[1px] bg-white w-6 shadow-sm `}
      ></label>
      <label
        htmlFor={item}
        className="text-dark-brown font-poppins font-semibold"
      >
        {item}
      </label>
    </div>
  );
};
