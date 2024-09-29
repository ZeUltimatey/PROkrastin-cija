export const ProfileInfo = () => {
  return (
    <div className="bg-light-gray shadow-lg rounded-md p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <img
            className="w-24 h-24 rounded-full object-cover border-4 border-medium-brown"
            src="https://via.placeholder.com/150"
            alt="Lietotāja attēls"
          />
          <div>
            <h2 className="text-3xl font-bold text-dark-brown font-poppins">
              Jānis Bērziņš
            </h2>
            <p className="text-sm text-dark-brown font-poppins">
              janis.berzins@gmail.com
            </p>
            <p className="text-sm text-dark-brown font-poppins">
              Pircējs kopš: 23.01.1999.
            </p>
          </div>
        </div>
        <button className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins">
          Rediģēt profilu
        </button>
      </div>
    </div>
  );
};
