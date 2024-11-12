import { useState } from "react";
import { Sidebar } from "../admin-panel/Sidebar";
import { FormInput } from "../../universal/FormInput";

interface IEncyclopedia {
  id: number;
  display_name: string;
  breed_information: string;
}

const data: IEncyclopedia = {
  id: 0,
  display_name: "",
  breed_information: "",
};

export const Encyclopedia = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<IEncyclopedia>(data);

  return (
    <div className="flex w-full">
      <div className="flex-1 bg-content-white">
        <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-brown font-poppins">
              Kaķu enciklopēdija
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-medium-brown text-white px-4 min-w-48 hover:bg-opacity-85 transition-all py-2 rounded-lg font-poppins"
            >
              <i className="fa-solid fa-plus" /> Pievienot rakstu
            </button>
          </div>
        </header>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 relative overflow-auto h-[45rem]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                  Enciklopēdijas raksta pievienošana
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Šķirnes nosaukums
                  </label>
                  <FormInput
                    value={formData.display_name}
                    onChange={(value) =>
                      setFormData({ ...formData, display_name: value })
                    }
                    placeholder="Ievadiet šķirnes nosaukumu"
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Par kaķa barošanu
                  </label>
                  <textarea
                    className="mt-1 w-full px-4 py-2 border font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                    rows={4}
                    placeholder="Ievadiet informāciju par barošanu"
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Par kaķa personību
                  </label>
                  <textarea
                    className="mt-1 w-full px-4 py-2 border font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                    rows={4}
                    placeholder="Ievadiet informāciju par personību"
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Par ieteicamajiem dzīves apstākļiem
                  </label>
                  <textarea
                    className="mt-1 w-full px-4 py-2 border font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                    rows={4}
                    placeholder="Ievadiet informāciju par dzīves apstākļiem"
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Noderīgi padomi
                  </label>
                  <textarea
                    className="mt-1 w-full px-4 py-2 border font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                    rows={4}
                    placeholder="Ievadiet noderīgus padomus"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-full">
                    <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                      Augšupielādēt attēlus
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="mt-1 w-full px-4 py-2 border font-poppins border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                  >
                    Atcelt
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-medium-brown text-white px-6 py-2 rounded-md shadow font-poppins"
                  >
                    Saglabāt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
