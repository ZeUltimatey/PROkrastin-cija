import { useState } from "react";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <form className="space-y-4">
      <div>
        <label className="text-dark-brown">E-pasts</label>
        <input
          type="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="tavs@epasts.lv"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="text-dark-brown">Parole</label>
        <input
          type="password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <a href="#" className="text-sm text-dark-brown hover:underline">
          Aizmirsi paroli?
        </a>
      </div>
      <button className="w-full bg-light-brown text-white font-semibold py-2 px-4 rounded-md hover:bg-medium-brown transition-all">
        Ienākt
      </button>
      <div className="text-center">
        <p className="text-gray-500">Tev vēl nav profila?</p>
        <a
          href="/register"
          className="text-dark-brown hover:underline font-semibold"
        >
          Reģistrējies šeit
        </a>
      </div>
    </form>
  );
};
