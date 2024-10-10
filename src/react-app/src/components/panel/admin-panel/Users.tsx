import { useState } from "react";
import { Sidebar } from "./Sidebar";

interface User {
  id: string;
  name: string;
  email: string;
  date: string;
  status: string;
}

export const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const users: User[] = [
    {
      id: "#1001",
      name: "Anna Vītola",
      email: "anna@epasts.com",
      date: "2024-01-15",
      status: "Aktīvs",
    },
    {
      id: "#1002",
      name: "Jānis Bērziņš",
      email: "janis@epasts.com",
      date: "2024-02-20",
      status: "Aktīvs",
    },
    {
      id: "#1003",
      name: "Laura Kalniņa",
      email: "laura@epasts.com",
      date: "2024-03-12",
      status: "Bloķēts",
    },
  ];

  return (
    <div className="min-h-screen flex bg-content-white">
      <Sidebar />

      <div className="flex-1">
        <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-brown font-poppins">
              Lietotāji
            </h1>
            <div className="flex space-x-4">
              <button className="bg-medium-brown text-white px-4 py-2 rounded-lg font-poppins">
                Pievienot lietotāju
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="bg-light-gray shadow rounded-lg border-2 border-medium-brown">
            <div className="p-6 border-b border-medium-brown">
              <h2 className="text-xl font-bold text-dark-brown font-poppins">
                Reģistrētie lietotāji
              </h2>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-medium-brown">
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Lietotāja ID
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Vārds
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    E-pasts
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Reģistrēšanās datums
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Statuss
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Rediģēt
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="border-b border-medium-brown" key={user.id}>
                    <td className="py-4 px-6 text-dark-brown">{user.id}</td>
                    <td className="py-4 px-6 text-dark-brown">{user.name}</td>
                    <td className="py-4 px-6 text-dark-brown">{user.email}</td>
                    <td className="py-4 px-6 text-dark-brown">{user.date}</td>
                    <td className="py-4 px-6 text-dark-brown">{user.status}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-medium-brown text-white px-4 py-2 rounded-lg font-poppins"
                      >
                        Rediģēt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-dark-brown mb-4 font-poppins">
              Rediģēt lietotāju
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-dark-brown font-poppins mb-2">
                  Vārds:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-medium-brown rounded-lg"
                  value={selectedUser?.name || ""}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-dark-brown font-poppins mb-2">
                  E-pasts:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-medium-brown rounded-lg"
                  value={selectedUser?.email || ""}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-dark-brown font-poppins mb-2">
                  Statuss:
                </label>
                <select
                  className="w-full p-2 border border-medium-brown rounded-lg"
                  value={selectedUser?.status}
                >
                  <option value="Aktīvs">Aktīvs</option>
                  <option value="Bloķēts">Bloķēts</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                  onClick={closeModal}
                >
                  Atcelt
                </button>
                <button
                  type="submit"
                  className="bg-medium-brown text-white px-4 py-2 rounded-lg font-poppins"
                >
                  Saglabāt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
