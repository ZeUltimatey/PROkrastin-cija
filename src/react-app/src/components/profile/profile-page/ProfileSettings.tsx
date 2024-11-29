import { useState } from "react";
import { Constants } from "../../universal/Constants";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../universal/Toast";
import { useConfirmation } from "../../universal/Confirmation";
import { IUser } from "../../universal/interfaces/IUser";
import { FormInput } from "../../universal/FormInput";

interface IPrefences {
  display_lowest_price: boolean;
  display_only_available: boolean;
  recieve_noficiations: boolean;
}

export const ProfileSettings = ({ user }: { user: IUser }) => {
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [preferences, setPerferences] = useState<IPrefences>({
    display_lowest_price: user.display_lowest_price === 1 ?? false,
    display_only_available: user.display_only_available === 1 ?? false,
    recieve_noficiations: user.recieve_noficiations === 1 ?? false,
  });

  const navigate = useNavigate();

  const handleOpenPreferences = () => {
    setIsPreferencesModalOpen(true);
  };

  const handleOpenPasswordChange = () => {
    setIsPasswordModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPreferencesModalOpen(false);
    setIsPasswordModalOpen(false);
  };

  const showToast = useToast();

  const confirm = useConfirmation();

  const handleAccountDelete = async () => {
    if (await confirm("Dzēst savu kontu?")) {
      await fetch(`${Constants.API_URL}/user`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      }).then((response) => {
        if (response.ok) {
          showToast(true, "Konts veiksmīgi izdzēsts.");
          localStorage.removeItem(Constants.LOCAL_STORAGE.TOKEN);
          navigate("/");
        }
      });
    }
    return;
  };

  const handlePasswordChange = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/change_password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify({
        old_password: formData.old_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation,
      }),
    }).then(async (response) => {
      if (response.ok) {
        showToast(true, "Parole veiksmīgi mainīta.");
        setIsPasswordModalOpen(false);
        setIsLoading(false);
        return;
      } else {
        const data = await response.json();
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          console.log("errormessages", errorMessages);
          errorMessages.forEach((message) => {
            switch (message) {
              case "Old password is wrong.":
                showToast(false, "Vecā parole nav pareiza.");
                break;
              case "The new password field must be at least 8 characters.":
                showToast(false, "Jaunajai parolei jābūt vismaz 8 rakstzīmēm.");
                break;
              case "The new password confirmation field must be at least 8 characters.":
                showToast(false, "Jaunajai parolei jābūt vismaz 8 rakstzīmēm.");
                break;
              case "The new password field confirmation does not match.":
              case "The new password confirmation field must match new password.":
                showToast(false, "Jaunās paroles nesakrīt.");
                break;
              case "New password is the same as the old password.":
                showToast(false, "Jaunā parole nedrīkst būt vienāda ar veco.");
                break;
              default:
                showToast(false, "Kļūda.");
                break;
            }
          });
        } else {
          switch (data.error) {
            case "Old password is wrong.":
              showToast(false, "Vecā parole nav pareiza.");
              break;
            case "The new password field must be at least 8 characters.":
              showToast(false, "Jaunajai parolei jābūt vismaz 8 rakstzīmēm.");
              break;
            case "The new password confirmation field must be at least 8 characters.":
              showToast(false, "Jaunajai parolei jābūt vismaz 8 rakstzīmēm.");
              break;
            case "The new password field confirmation does not match.":
            case "The new password confirmation field must match new password.":
              showToast(false, "Jaunās paroles nesakrīt.");
              break;
            case "New password is the same as the old password.":
              showToast(false, "Jaunā parole nedrīkst būt vienāda ar veco.");
              break;
            default:
              showToast(false, "Kļūda.");
              break;
          }
        }
      }
    });

    setIsLoading(false);
  };

  const savePreferences = () => {
    fetch(`${Constants.API_URL}/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(preferences),
    }).then((response) => {
      if (response.ok) {
        showToast(true, "Preferences saglabātas!");
        setIsPreferencesModalOpen(false);
      }
    });
  };

  return (
    <div className="bg-light-gray shadow-md rounded-md p-8 border-2 border-medium-brown">
      <h3 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
        Profila iestatījumi
      </h3>
      <ul className="space-y-4">
        <li>
          <p className="text-dark-brown font-poppins">Lietotāja preferences</p>
          <button
            onClick={handleOpenPreferences}
            className="text-medium-brown hover:underline text-sm font-poppins flex items-center"
          >
            <i className="fa-solid fa-pen-to-square m-1"></i> Iestatīt
          </button>
        </li>
        <li>
          <p className="text-dark-brown font-poppins">Parole</p>
          <button
            onClick={handleOpenPasswordChange}
            className="text-medium-brown hover:underline text-sm font-poppins flex items-center"
          >
            <i className="fa-solid fa-pen-to-square m-1"></i> Mainīt paroli
          </button>
        </li>
        <li>
          <button
            onClick={handleAccountDelete}
            className="bg-red-400 text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-opacity-80 transition-all font-poppins mt-4"
          >
            <i className="fa-solid fa-trash mr-2"></i> Dzēst kontu
          </button>
        </li>
      </ul>

      {isPreferencesModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Lietotāja preferences
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form className="space-y-4">
              <div className="flex items-center">
                <input
                  id="email"
                  type="checkbox"
                  className="form-checkbox text-medium-brown mr-2"
                  checked={preferences?.recieve_noficiations}
                  onChange={(e) => {
                    setPerferences({
                      ...preferences,
                      recieve_noficiations: e.target.checked,
                    });
                  }}
                />
                <label
                  htmlFor="email"
                  className="text-sm text-dark-brown font-poppins"
                >
                  E-pasta paziņojumi
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="cheapest"
                  type="checkbox"
                  className="form-checkbox text-medium-brown mr-2"
                  checked={preferences?.display_lowest_price}
                  onChange={(e) => {
                    setPerferences({
                      ...preferences,
                      display_lowest_price: e.target.checked,
                    });
                  }}
                />
                <label
                  htmlFor="cheapest"
                  className="text-sm text-dark-brown font-poppins"
                >
                  Vienmēr rādīt lētākos piedāvājumus
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="available"
                  type="checkbox"
                  className="form-checkbox text-medium-brown mr-2"
                  checked={preferences?.display_only_available}
                  onChange={(e) => {
                    setPerferences({
                      ...preferences,
                      display_only_available: e.target.checked,
                    });
                  }}
                />
                <label
                  htmlFor="available"
                  className="text-sm text-dark-brown font-poppins"
                >
                  Rādīt tikai uzreiz pieejamos produktus
                </label>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                >
                  Atcelt
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="bg-medium-brown text-white px-6 py-2 rounded-md shadow font-poppins"
                >
                  Saglabāt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Mainīt paroli
              </h2>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="w-full">
                <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                  Vecā parole
                </label>
                <FormInput
                  placeholder="Ievadiet veco paroli"
                  value={formData.old_password}
                  type="password"
                  onChange={(e) =>
                    setFormData({ ...formData, old_password: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                  Jaunā parole
                </label>
                <FormInput
                  placeholder="Ievadiet jauno paroli"
                  value={formData.new_password}
                  type="password"
                  onChange={(e) =>
                    setFormData({ ...formData, new_password: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                  Paroles apstiprinājums
                </label>
                <FormInput
                  placeholder="Apstipriniet paroli"
                  value={formData.new_password_confirmation}
                  type="password"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      new_password_confirmation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
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
