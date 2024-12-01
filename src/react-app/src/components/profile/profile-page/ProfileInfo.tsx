import { useEffect, useState } from "react";
import { Constants } from "../../universal/Constants";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../universal/Toast";
import { FormInput } from "../../universal/FormInput";
import { Spinner } from "../../universal/Spinner";
import { IUser } from "../../universal/interfaces/IUser";
import { useConfirmation } from "../../universal/Confirmation";

export const ProfileInfo = ({ user }: { user: IUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<IUser>(user);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();

  const navigate = useNavigate();
  const confirm = useConfirmation();

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
    if (formData.image_url) {
      await handleProfilePictureAdd();
    }
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
        setTimeout(() => window.location.reload(), 1000);
        setIsModalOpen(false);
      } else {
        const data = await response.json();
        showToast(
          false,
          data?.message ?? "Kļūda lieotāja informācijas saglabāšanā."
        );
      }
    });
    setIsLoading(false);
  };

  const handleProfilePictureAdd = async () => {
    const imageData = new FormData();
    imageData.append("image", formData.image_url);
    await fetch(`${Constants.API_URL}/user/image/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: imageData,
    }).then(async (response) => {
      if (response.ok) {
        showToast(true, "Profila bilde pievienota.");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda profila bildes pievienošanā.");
      }
    });
  };

  const handleProfilePictureRemove = async () => {
    if (await confirm("Noņemt profila bildi?")) {
      await fetch(`${Constants.API_URL}/user/image/remove`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      }).then(async (response) => {
        if (response.ok) {
          showToast(true, "Profila bilde noņemta.");
          setTimeout(() => window.location.reload(), 1000);
        } else {
          showToast(false, "Kļūda profila bildes noņemšanā.");
        }
      });
    }
    return;
  };

  const resendConfirmationEmail = async () => {
    await fetch(`${Constants.API_URL}/user/resend_verification`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        showToast(true, "Apstiprinājuma e-pasts nosūtīts.");
      } else {
        showToast(false, "Kļūda e-pasta apstiprinājuma nosūtīšanā.");
      }
    });
  };

  return (
    <div className="bg-light-gray shadow-md rounded-md border-2 p-6 border-medium-brown">
      {user && (
        <div className="flex lg:flex-row flex-col items-center justify-between h-full px-6 gap-2">
          <div className="flex items-center gap-4">
            <img
              className="lg:w-24 lg:h-24 h-12 w-12 rounded-full object-cover border-4 border-medium-brown"
              src={
                user?.attachment?.images[0]
                  ? Constants.BASE_URL + user.attachment.images[0].url
                  : "https://t3.ftcdn.net/jpg/01/79/88/20/360_F_179882080_Zga46fOuCNnZlF9o2IC6gYgHVQFDVKMv.jpg"
              }
              alt="Lietotāja attēls"
            />
            <div>
              <h2 className="lg:text-3xl text-lg font-bold text-dark-brown font-poppins">
                {user.name} {user.surname}
              </h2>
              <h2 className="font-bold text-dark-brown lg:text-base text-sm font-poppins">
                @{user.display_name}
              </h2>
              <p className="lg:text-sm text-xs text-dark-brown font-poppins">
                {user.email}
              </p>
              <p className="lg:text-sm text-xs text-dark-brown font-poppins">
                Pircējs kopš: {user.created_at.slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-4 gap-2">
            {user.user_role == "Admin" && (
              <button
                onClick={() => navigate("/panel")}
                className="hidden lg:block bg-light-brown text-white lg:px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
              >
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </button>
            )}
            <button
              onClick={handleLogoutClick}
              className="bg-light-brown text-white lg:px-6 lg:py-2.5 px-4 py-1 lg:text-lg text-sm rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Iziet
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-light-brown text-white px-6 py-2.5 lg:text-lg text-sm rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
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
          <div className="bg-white p-8 rounded-lg shadow-lg lg:w-1/3 relative">
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
                    onChange={(e) => {
                      if (/^[a-zA-Z]*$/.test(e.target.value)) {
                        setFormData({ ...formData, name: e.target.value });
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Uzārds
                  </label>
                  <FormInput
                    placeholder="Ievadiet uzvārdu"
                    value={formData.surname}
                    onChange={(e) => {
                      if (/^[a-zA-Z]*$/.test(e.target.value)) {
                        setFormData({ ...formData, surname: e.target.value });
                      }
                    }}
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
                {!user.email_verified_at && (
                  <p className="text-red-400 text-sm font-poppins">
                    Lūdzu, apstipriniet e-pastu!{" "}
                    <span
                      onClick={resendConfirmationEmail}
                      className="underline hover:cursor-pointer text-dark-brown"
                    >
                      Nosūtīt vēlreiz?
                    </span>
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                  Augšupielādēt profila bildi
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.files[0] })
                  }
                  type="file"
                  accept="image/*"
                  className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm "
                />
                <p className="text-sm opacity-40">
                  Bildes izmērs nedrīkst pārsniegt 4MB.
                </p>
                {user?.attachment?.images[0] && (
                  <div
                    onClick={handleProfilePictureRemove}
                    className="flex gap-2 place-items-center hover:opacity-70 hover:cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                    <p className="text-sm text-dark-brown font-poppins my-1">
                      Noņemt profila bildi
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Apstipriniet paroli
                  </label>
                  <FormInput
                    placeholder="Ievadiet savu paroli"
                    value={formData.password}
                    type="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
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
