import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Constants } from "../universal/Constants";
import { IBreed } from "./BreedCatalog";

export const BreedDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breed, setBreed] = useState<IBreed>(null);

  const navigate = useNavigate();

  const { breedId } = useParams();

  const getBreed = async () => {
    await fetch(`${Constants.API_URL}/breeds/${breedId}`, {}).then(
      async (response) => {
        if (response.ok) {
          const data = await response.json();
          setBreed(data.data);
        }
      }
    );
  };

  useEffect(() => {
    getBreed();
  }, []);

  return (
    <div className="bg-content-white min-h-screen p-8">
      <div className="relative w-full h-80 bg-temp-bg-image bg-cover bg-center p-12 flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>

        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => navigate("/breeds")}
            className="flex items-center gap-2 text-dark-brown font-semibold"
          >
            <i className="fa-solid fa-arrow-left text-2xl"></i>
          </button>
        </div>

        <div className="relative z-20 text-center text-light-gray">
          <span className="text-6xl font-baloo font-bold">Meinkūns</span>
          <p className="text-xl font-hind font-medium mt-2">
            Uzziniet vairāk par šo šķirni.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 p-8">
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div
            className="w-64 h-80 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-full h-full bg-gray-300 rounded-md shadow-lg flex items-center justify-center"></div>
          </div>

          <div
            className="w-64 h-80 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-full h-full bg-gray-300 rounded-md shadow-lg flex items-center justify-center"></div>
          </div>

          <div
            className="w-64 h-80 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-full h-full bg-gray-300 rounded-md shadow-lg flex items-center justify-center"></div>
          </div>
        </div>

        {breed && (
          <div className="flex flex-col grow gap-8 font-poppins">
            <div className="bg-light-gray p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold text-accent-brown mb-4">
                Barošana
              </h3>
              <p className="text-dark-brown text-lg">{breed.feeding_info}</p>
            </div>

            <div className="bg-light-gray p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold text-accent-brown mb-4">
                Personība
              </h3>
              <p className="text-dark-brown text-lg">
                {breed.personality_info}
              </p>
            </div>

            <div className="bg-light-gray p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold text-accent-brown mb-4">
                Dzīves apstākļi
              </h3>
              <p className="text-dark-brown text-lg">
                {breed.environment_info}
              </p>
            </div>

            <div className="bg-light-gray p-6 rounded-md shadow-lg">
              <h3 className="text-2xl font-semibold text-accent-brown mb-4">
                Noderīgi padomi
              </h3>
              <p className="text-dark-brown text-lg">{breed.tips_info}</p>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 lg:w-2/4">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="flex items-center justify-center h-96 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      )}
    </div>
  );
};
