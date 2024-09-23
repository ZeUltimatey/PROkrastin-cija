export const LoginForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label className="text-[#3e2a19]">E-pasts</label>
        <input
          type="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="tavs@epasts.lv"
        />
      </div>
      <div>
        <label className="text-[#3e2a19]">Parole</label>
        <input
          type="password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="••••••••"
        />
      </div>
      <div className="flex items-center justify-between">
        <a href="#" className="text-sm text-[#3e2a19] hover:underline">
          Aizmirsi paroli?
        </a>
      </div>
      <button className="w-full bg-[#C59D82] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#b38b6f] transition-all">
        Ienākt
      </button>
      <div className="text-center">
        <p className="text-gray-500">Tev vēl nav profila?</p>
        <a
          href="/register"
          className="text-[#3e2a19] hover:underline font-semibold"
        >
          Reģistrējies šeit
        </a>
      </div>
    </form>
  );
};
