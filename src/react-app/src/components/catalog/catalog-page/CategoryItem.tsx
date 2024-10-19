interface Props {
  filter: any;
  item: string;
  onSelect: (filter: any) => void;
}

export const CategoryItem = (props: Props) => {
  const { filter, item, onSelect } = props;
  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        id={item}
        name={item}
        value={item}
        className="w-0 opacity-0 absolute"
        onChange={() =>
          onSelect({
            ...filter,
            category: { ...filter.category, [item]: !filter.category[item] },
          })
        }
      />
      <label
        htmlFor={item}
        className={`text-dark-brown font-poppins font-semibold border-gray-300   w-6 shadow-sm ${
          filter.category[item]
            ? "bg-accent-brown border-white border"
            : "bg-white border-gray-300 border-[1px]"
        }`}
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
