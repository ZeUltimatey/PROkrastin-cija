export const PaymentSuccessful = () => {
  return (
    <div className="flex min-h-screen font-poppins">
      <div className="bg-content-white w-full text-center py-12">
        <h2 className="text-4xl font-bold text-dark-brown mb-6">
          Maksājums veiksmīgs
        </h2>
        <p className="text-lg text-dark-brown mb-6">Paldies par pirkumu!</p>
        <div className="mx-auto mb-6 text-center rounded-full pt-1 border-[3px] border-green-700 shadow-md w-12 h-12">
          <i className="fa-solid fa-check text-3xl text-green-700"></i>
        </div>
        <a href="/">Atgriezties uz sākumlapu</a>
      </div>
    </div>
  );
};
