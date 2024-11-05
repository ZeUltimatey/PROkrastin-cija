import { useState } from "react";
import { FormInput } from "../../universal/FormInput";

interface Encyclopedia {
  id: number;
  display_name: string;
  breed_information: string;
}

const data: Encyclopedia = {
  id: 0,
  display_name: "",
  breed_information: "",
};

export const Encyclopedia = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<Encyclopedia>(data);

  return (
    <div className="flex w-full">
      <div className="flex-1 bg-content-white">
        <header className="p-8 border-b-2 shadow bg-content-white border-medium-brown">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-dark-brown font-poppins">
              Kaķu enciklopēdija
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-white transition-all rounded-lg bg-medium-brown min-w-48 hover:bg-opacity-85 font-poppins"
            >
              <i className="fa-solid fa-plus" /> Pievienot rakstu
            </button>
          </div>
        </header>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 relative overflow-auto h-[45rem]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                  Enciklopēdijas raksta pievienošana
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center justify-center rounded-full text-dark-brown w-7 h-7"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="mb-1 text-sm font-semibold text-dark-brown font-poppins">
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
                  <label className="mb-1 text-sm font-semibold text-dark-brown font-poppins">
                    Par kaķa barošanu
                  </label>
                  <textarea
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm resize-none font-poppins"
                    rows={4}
                    placeholder="Ievadiet informāciju par barošanu"
                  />
                </div>
                <div>
                  <label className="mb-1 text-sm font-semibold text-dark-brown font-poppins">
                    Par kaķa personību
                  </label>
                  <textarea
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm resize-none font-poppins"
                    rows={4}
                    placeholder="Ievadiet informāciju par personību"
                  />
                </div>
                <div>
                  <label className="mb-1 text-sm font-semibold text-dark-brown font-poppins">
                    Par ieteicamajiem dzīves apstākļiem
                  </label>
                  <textarea
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm resize-none font-poppins"
                    rows={4}
                    placeholder="Ievadiet informāciju par dzīves apstākļiem"
                  />
                </div>
                <div>
                  <label className="mb-1 text-sm font-semibold text-dark-brown font-poppins">
                    Noderīgi padomi
                  </label>
                  <textarea
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm resize-none font-poppins"
                    rows={4}
                    placeholder="Ievadiet noderīgus padomus"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-full">
                    <label className="mb-1 text-sm font-semibold text-dark-brown font-poppins">
                      Augšupielādēt attēlus
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm font-poppins"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-md shadow bg-light-gray text-dark-brown font-poppins"
                  >
                    Atcelt
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-white rounded-md shadow bg-medium-brown font-poppins"
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
