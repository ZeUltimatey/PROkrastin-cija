export const BackgroundImage = () => {
  return (
    <>
      <img
        src={"../login_bg.jpg"}
        alt="Login background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
    </>
  );
};
