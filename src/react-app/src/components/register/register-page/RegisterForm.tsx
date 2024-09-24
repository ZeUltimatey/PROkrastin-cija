export const RegisterForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <label className="font-medium text-[#3e2a19]">Vārds</label>
          <input
            className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Ievadi savu vārdu"
          />
        </div>

        <div className="w-full">
          <label className="font-medium text-[#3e2a19]">Uzvārds</label>
          <input
            className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Ievadi savu uzvārdu"
          />
        </div>
      </div>
      <div className="">
        <label className="font-medium text-[#3e2a19]">Lietotājvārds</label>
        <input
          type="text"
          id="username"
          className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ievadi savu lietotājvārdu"
        />
      </div>
      <div className="">
        <label className="font-medium text-[#3e2a19]">E-pasts</label>
        <input
          type="email"
          className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ievadi savu e-pastu"
        />
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <label className="font-medium text-[#3e2a19]">Parole</label>
          <input
            type="password"
            className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Izveido savu paroli"
          />
        </div>

        <div className="w-full">
          <label className="font-medium text-[#3e2a19]">Atkārtota parole</label>
          <input
            type="password"
            className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Ievadi atkārtotu paroli"
          />
        </div>
      </div>
      <div className="mt-2">
        <button className="w-full bg-[#C59D82] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#b38b6f] transition-all">
          Reģistrēties
        </button>
      </div>
      <div className="">
        <div className="text-center">
          <p className=" text-gray-500">Tev jau ir profils?</p>
          <a
            href="/login"
            className="text-[#3e2a19] hover:underline font-semibold"
          >
            Ienāc šeit
          </a>
        </div>
      </div>
    </form>
  );
};
