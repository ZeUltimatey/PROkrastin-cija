export const Button = ({ isInfoButton }: { isInfoButton: boolean }) => {
  if (!isInfoButton) {
    return (
      <button className="bg-[#F3C9B1] min-w-52 justify-center hover:gap-3 hover:brightness-90 transition-all hover:shadow-xl rounded-full px-8 py-2 flex gap-2 place-items-center shadow-md">
        <span className="font-semibold font-poppins">Skatīt kaķus</span>
        <i className="fa-solid fa-angles-right"></i>
      </button>
    );
  } else {
    return (
      <button className="bg-[#F1EDE5] hover:brightness-90  justify-center min-w-52 hover:gap-3 transition-all hover:shadow-xl rounded-full px-8 py-2 flex gap-2 place-items-center shadow-md">
        <span className="font-semibold font-poppins">Uzzināt vairāk</span>
        <i className="fa-solid fa-circle-info"></i>
      </button>
    );
  }
};
