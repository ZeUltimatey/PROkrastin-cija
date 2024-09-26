export const Button = ({ isInfoButton }: { isInfoButton: boolean }) => {
  if (!isInfoButton) {
    return (
      <button className="bg-accent-brown text-dark-brown min-w-64 justify-center hover:gap-4 hover:brightness-90 text-lg transition-all hover:shadow-xl rounded-full px-8 py-4 flex gap-2 place-items-center shadow-md">
        <span className="font-semibold font-poppins">Skatīt kaķus</span>
        <i className="fa-solid fa-angles-right"></i>
      </button>
    );
  } else {
    return (
      <button className="bg-content-white hover:brightness-90 justify-center min-w-64 hover:gap-4 transition-all hover:shadow-xl text-lg rounded-full px-8 py-4 flex gap-2 place-items-center shadow-md">
        <span className="font-semibold font-poppins">Uzzināt vairāk</span>
        <i className="fa-solid fa-circle-info"></i>
      </button>
    );
  }
};
