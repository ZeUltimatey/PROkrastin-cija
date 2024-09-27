export const Category = ({
  name,
  link,
  idx,
  image,
}: {
  name: string;
  link: string;
  idx: number;
  image: string;
}) => {
  return (
    <div
      onClick={() => window.location.assign(link)}
      className="group w-80 h-80 hover:cursor-pointer"
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="absolute z-0 shadow-md rounded-md group-hover:brightness-95 group-hover:blur-sm transition-all w-80 h-80 bg-center bg-cover"
      ></div>
      <span className="z-10 absolute w-80 h-80 text-center text-4xl font-bold select-none py-36 transition-all opacity-0 group-hover:opacity-100">
        <p className="text-content-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {name}
        </p>
      </span>
    </div>
  );
};
