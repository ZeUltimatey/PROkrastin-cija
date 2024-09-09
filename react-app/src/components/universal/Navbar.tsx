export const Navbar = () => {
  return (
    <div className="h-20 bg-[#EDEAE1] rounded-t-md flex place-items-center px-12 justify-between">
      <div className="text-2xl font-playwrite-cuba w-48">Murrātava</div>
      <ul className="flex gap-12 font-poppins text-xl font-semibold">
        <li className="hover:cursor-pointer">Kaķi</li>
        <li className="hover:cursor-pointer">Barība</li>
        <li className="hover:cursor-pointer">Rotaļlietas</li>
        <li className="hover:cursor-pointer">Aksesuāri</li>
      </ul>
      <div className="flex gap-12 w-48 justify-end">
        <i className="fa-solid fa-basket-shopping text-2xl"></i>
        <i className="fa-solid fa-user text-2xl"></i>
      </div>
    </div>
  );
};
