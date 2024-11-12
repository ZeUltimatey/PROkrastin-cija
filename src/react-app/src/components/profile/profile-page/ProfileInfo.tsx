import { useEffect, useState } from "react";
import { Constants } from "../../universal/Constants";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../universal/Toast";
import { FormInput } from "../../universal/FormInput";
import { Spinner } from "../../universal/Spinner";
import { IUser } from "../../universal/interfaces/IUser";

export const ProfileInfo = ({ user }: { user: IUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<IUser>(user);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();

  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await fetch(`${Constants.API_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem(Constants.LOCAL_STORAGE.TOKEN);
        localStorage.removeItem(Constants.LOCAL_STORAGE.CART);
        showToast(true, "Iziešana veiksmīga.");
        navigate("/");
      } else {
        showToast(false, "error");
      }
    });
  };

  const updateUserInfo = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${Constants.API_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(formData),
    }).then(async (response) => {
      if (response.ok) {
        showToast(true, "Lietotāja informācija saglabāta.");
        window.location.reload();
        setIsModalOpen(false);
      } else {
        showToast(false, "Kļūda lieotāja informācijas saglabāšanā.");
      }
    });
    setIsLoading(false);
  };

  return (
    <div className="bg-light-gray shadow-md rounded-md border-2 h-40 border-medium-brown">
      {user && (
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-medium-brown"
              src="https://via.placeholder.com/150"
              alt="Lietotāja attēls"
            />
            <div>
              <h2 className="text-3xl font-bold text-dark-brown font-poppins">
                {user.name} {user.surname}
              </h2>
              <h2 className="font-bold text-dark-brown font-poppins">
                @{user.display_name}
              </h2>
              <p className="text-sm text-dark-brown font-poppins">
                {user.email}
              </p>
              <p className="text-sm text-dark-brown font-poppins">
                Pircējs kopš: {user.created_at.slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {user.user_role == "Admin" && (
              <button
                onClick={() => navigate("/panel")}
                className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
              >
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </button>
            )}
            <button
              onClick={handleLogoutClick}
              className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Iziet
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
            >
              <i className="fa-solid fa-pen-to-square"></i> Rediģēt profilu
            </button>
          </div>
        </div>
      )}

      {!user && (
        <div className="w-full h-full flex place-items-center justify-center">
          <Spinner />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Rediģēt profila informāciju
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={updateUserInfo} className="space-y-4">
              <div className="flex gap-2">
                <div>
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Vārds
                  </label>
                  <FormInput
                    placeholder="Ievadiet vārdu"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Uzārds
                  </label>
                  <FormInput
                    placeholder="Ievadiet uzvārdu"
                    value={formData.surname}
                    onChange={(e) =>
                      setFormData({ ...formData, surname: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                  Lietotājvārds
                </label>
                <FormInput
                  placeholder="Ievadiet lietotājvārdu"
                  value={formData.display_name}
                  onChange={(e) =>
                    setFormData({ ...formData, display_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                  E-pasts
                </label>
                <FormInput
                  placeholder="Ievadiet e-pastu"
                  value={formData.email}
                  type="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Parole
                  </label>
                  <FormInput
                    placeholder="Ievadiet jaunu paroli"
                    value={formData.password}
                    type="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Paroles apstiprinājums
                  </label>
                  <FormInput
                    placeholder="Apstipriniet paroli"
                    value={formData.password_confirmation}
                    type="password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password_confirmation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
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
