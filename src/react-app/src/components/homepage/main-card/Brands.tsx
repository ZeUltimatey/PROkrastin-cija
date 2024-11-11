export const Brands = () => {
  const buttonStyle =
    "bg-accent-brown text-dark-brown w-12 h-12 rounded-full flex place-items-center justify-center shadow-md hover:shadow-xl transition-all hover:brightness-75 hover:cursor-pointer";
  return (
    <div className="flex flex-col gap-6 place-self-end">
      <div
        onClick={() =>
          window.location.assign("https://www.youtube.com/watch?v=xvFZjo5PgG0")
        }
        className={buttonStyle}
      >
        <i className="fa-brands fa-x-twitter text-3xl"></i>
      </div>
      <div
        onClick={() =>
          window.location.assign("https://www.youtube.com/watch?v=xvFZjo5PgG0")
        }
        className={buttonStyle}
      >
        <i className="fa-brands fa-facebook text-3xl"></i>
      </div>
      <div
        onClick={() =>
          window.location.assign("https://www.youtube.com/watch?v=xvFZjo5PgG0")
        }
        className={buttonStyle}
      >
        <i className="fa-brands fa-youtube text-3xl"></i>
      </div>
      <div
        onClick={() =>
          window.location.assign("https://www.youtube.com/watch?v=xvFZjo5PgG0")
        }
        className={buttonStyle}
      >
        <i className="fa-brands fa-instagram text-3xl"></i>
      </div>
    </div>
  );
};
