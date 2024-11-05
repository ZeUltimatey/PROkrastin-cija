import { useState } from "react";
import { FormInput } from "../universal/FormInput";

interface Breed {
  id: number;
  display_name: string;
  breed_information: string;
}
export const BreedCatalog = () => {
  const breeds = [
    { id: 1, name: "Meinkūns", description: "Liels un draudzīgs mīlulis." },
    {
      id: 2,
      name: "Persijas",
      description: "Garspalvains un mīļš ķepainais draugs.",
    },
    { id: 3, name: "Bengālijas", description: "Riabs un rotaļīgs pēc dabas." },
    { id: 4, name: "Siamiešu", description: "Vokāla un sociāla šķirne." },
    {
      id: 5,
      name: "Sfinkss",
      description: "Bez apmatojuma un enerģisks kaķis.",
    },
  ];

  const [formData, setFormData] = useState<Breed>({} as Breed);

  return (
    <div className="bg-content-white">
      <div className="w-full h-80 object-cover bg-temp-bg-image bg-cover p-12 flex flex-col gap-2">
        <span className="text-6xl font-baloo text-dark-brown font-bold">
          Kaķu šķirņu enciklopēdija
        </span>
        <p className="text-xl font-hind text-medium-brown font-medium">
          Uzziniet par dažādām kaķu šķirnēm un to īpatnībām.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-6 p-8">
        <div className="w-full lg:w-1/4 p-4 rounded-md bg-content-white shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Izvēlēties šķirnes:</h3>
          {breeds.map(({ id, name }) => (
            <div key={id} className="flex gap-2 mb-2">
              <label className="w-6 shadow-sm bg-white border-gray-300 border-2"></label>
              <label className="text-dark-brown font-poppins font-semibold">
                {name}
              </label>
            </div>
          ))}
        </div>

        <div className="flex flex-col grow gap-1">
          <div className="hidden mx-8 md:flex text-lg lg:text-xl font-semibold place-items-center border-2 rounded-full border-light-gray">
            <div className="flex grow">
              <FormInput
                placeholder="Meklēt šķirni..."
                type="text"
                value={formData.display_name}
                onChange={(e) =>
                  setFormData({ ...formData, display_name: e.target.value })
                }
                disabled
              />
              <button
                className="bg-white text-2xl px-10 rounded-e-full h-12 flex place-items-center"
                disabled
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <div className="justify-between mx-8 flex place-items-center">
            <span className="font-poppins text-dark-brown font-semibold">
              Atrastas {breeds.length} šķirnes
            </span>
          </div>

          <div className="mx-8 h-auto mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-stretch gap-12">
              {breeds.map(({ id, name, description }) => (
                <div
                  key={id}
                  className="rounded-t-md shadow-lg flex flex-col justify-between bg-light-gray"
                >
                  <div className="h-40 bg-red-200 rounded-t-md"></div>{" "}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-dark-brown">
                      {name}
                    </h3>
                    <p className="text-accent-brown mb-2">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
