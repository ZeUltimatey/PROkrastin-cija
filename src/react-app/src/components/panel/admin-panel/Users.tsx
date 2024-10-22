import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Constants } from "../../universal/Constants";
import { User } from "../../universal/interfaces/User";
import { FormInput } from "../../universal/FormInput";
import { useToast } from "../../universal/Toast";

export const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useToast();

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const getAllUsers = async () => {
    await fetch(`${Constants.API_URL}/all_users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          Constants.SESSION_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    });
  };

  const onUserUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(
          Constants.SESSION_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(selectedUser),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUsers((prev) =>
          prev.map((user) => (user.id === data.id ? data : user))
        );
        closeModal();
        setIsLoading(false);
        showToast(true, "Lietotājs atjaunots!");
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
                <tr className="border-b border-medium-brown text-center">
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
                    Darbības
                  </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr
                      className="border-b border-medium-brown text-center"
                      key={user.id}
                    >
                      <td className="py-4 px-6 text-dark-brown">{user.id}</td>
                      <td className="py-4 px-6 text-dark-brown">{user.name}</td>
                      <td className="py-4 px-6 text-dark-brown">
                        {user.email}
                      </td>
                      <td className="py-4 px-6 text-dark-brown">
                        {user.created_at.slice(0, 10)}
                      </td>
                      <td className="py-4 px-6 text-dark-brown">
                        {user.deactivated ? "Bloķēts" : "Aktīvs"}
                      </td>
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
            <form onSubmit={onUserUpdate}>
              <div className="flex gap-2">
                <div className="mb-2">
                  <label className="block text-dark-brown font-poppins">
                    Vārds:
                  </label>
                  <FormInput
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-dark-brown font-poppins">
                    Vārds:
                  </label>
                  <FormInput
                    value={selectedUser.surname}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        surname: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-dark-brown font-poppins">
                  E-pasts:
                </label>
                <FormInput
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-dark-brown font-poppins">
                  Statuss:
                </label>
                <select
                  className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm"
                  value={selectedUser?.deactivated ? "Bloķēts" : "Aktīvs"}
                  onChange={(e) => {
                    setSelectedUser({
                      ...selectedUser,
                      deactivated: e.target.value === "Bloķēts" ? 1 : 0,
                    });
                  }}
                >
                  <option value="Aktīvs">Aktīvs</option>
                  <option value="Bloķēts">Bloķēts</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={closeModal}
                  className="bg-light-gray text-dark-brown hover:bg-opacity-70 px-4 py-2 rounded-md shadow font-poppins"
                >
                  Atcelt
                </button>
                <input
                  type="submit"
                  value="Saglabāt"
                  disabled={isLoading}
                  className={`${
                    isLoading
                      ? "bg-gray-200 hover:cursor-not-allowed"
                      : "hover:cursor-pointer bg-medium-brown hover:bg-opacity-70"
                  }   text-white px-6 py-2 rounded-md shadow font-poppins`}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
