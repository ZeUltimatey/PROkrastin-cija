import { useState } from "react";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        alert("Login veiksmīgs!");
      }
      console.log(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
      <input
        type="submit"
        value="Ienākt"
        className="w-full bg-light-brown text-white font-semibold py-2 px-4 rounded-md hover:bg-medium-brown transition-all"
      ></input>
      <div className="text-center">
        <p className="text-gray-500">Tev vēl nav profila?</p>
        <a
          href="/auth/register"
          className="text-dark-brown hover:underline font-semibold"
        >
          Reģistrējies šeit
        </a>
      </div>
    </form>
  );
};
