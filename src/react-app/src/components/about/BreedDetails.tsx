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
          setBreed(data.data[0]);
        }
      }
    );
  };

  useEffect(() => {
    getBreed();
  }, []);

  return (
    <div className="bg-content-white min-h-screen">
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
          <span className="text-6xl font-baloo font-bold">
            {breed && breed.display_name}
          </span>
          <p className="text-xl font-hind font-medium mt-2">
            Uzziniet vairāk par šo šķirni.
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-col gap-12 p-12">
          {breed?.images?.images &&
            breed.images.images.map((image: any) => (
              <img
                key={image.id}
                src={Constants.BASE_URL + image.url}
                alt={breed.display_name}
                className="w-48 h-auto rounded-md shadow-md"
              />
            ))}
        </div>

        {breed && (
          <div className="flex flex-col grow mt-12 gap-8 font-poppins">
            <div className="bg-light-gray p-6 rounded-md shadow-lg">
              <h3 className="lg:text-2xl text-lg font-semibold text-accent-brown mb-4">
                Barošana
              </h3>
              <p className="text-dark-brown lg:text-lg">{breed.feeding_info}</p>
            </div>

            <div className="bg-light-gray p-6 rounded-md shadow-lg">
              <h3 className="lg:text-2xl text-lg font-semibold text-accent-brown mb-4">
                Personība
              </h3>
              <p className="text-dark-brown lg:text-lg">
                {breed.personality_info}
              </p>
            </div>

            <div className="bg-light-gray p-6 rounded-md shadow-lg">
              <h3 className="lg:text-2xl text-lg font-semibold text-accent-brown mb-4">
                Dzīves apstākļi
              </h3>
              <p className="text-dark-brown lg:text-lg">
                {breed.environment_info}
              </p>
            </div>

            <div className="bg-light-gray p-6 rounded-md shadow-lg">
              <h3 className="lg:text-2xl text-lg font-semibold text-accent-brown mb-4">
                Noderīgi padomi
              </h3>
              <p className="text-dark-brown lg:text-lg">{breed.tips_info}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
