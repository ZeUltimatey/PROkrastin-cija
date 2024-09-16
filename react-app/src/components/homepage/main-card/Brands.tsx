export const Brands = () => {
  const buttonStyle =
    "bg-[#A67144] text-[#3e2a19] w-12 h-12 rounded-full flex place-items-center justify-center shadow-md hover:shadow-xl transition-all hover:brightness-75 hover:cursor-pointer";
  return (
    <div className="flex flex-col gap-6 place-self-end">
      <div className={buttonStyle}>
        <i className="fa-brands fa-x-twitter text-3xl"></i>
      </div>
      <div className={buttonStyle}>
        <i className="fa-brands fa-facebook text-3xl"></i>
      </div>
      <div className={buttonStyle}>
        <i className="fa-brands fa-youtube text-3xl"></i>
      </div>
      <div className={buttonStyle}>
        <i className="fa-brands fa-instagram text-3xl"></i>
      </div>
    </div>
  );
};
