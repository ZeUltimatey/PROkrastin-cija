import { useState } from "react";

export const BreedDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-content-white min-h-screen p-8">
      <div className="relative w-full h-80 bg-temp-bg-image bg-cover bg-center p-12 flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>

        <div className="absolute top-4 left-4 z-10">
          <button className="flex items-center gap-2 text-dark-brown font-semibold hover:text-accent-brown">
            <i className="fa-solid fa-arrow-left text-2xl"></i>
            Atpakaļ uz šķirņu enciklopēdiju
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

        <div className="flex flex-col grow gap-8">
          <div className="bg-light-gray p-6 rounded-md shadow-lg">
            <h3 className="text-2xl font-semibold text-accent-brown mb-4">
              Barošana
            </h3>
            <p className="text-dark-brown text-lg">
              Meinkūns ir liela šķirne, kurai nepieciešama sabalansēta diēta,
              kas satur pietiekami daudz proteīna, lai uzturētu viņu muskuļu
              masu un enerģijas līmeni. Ieteicams piedāvāt augstas kvalitātes
              sausās vai mitrās barības, īpaši piemērotas lielu šķirņu kaķiem.
              Svarīgi arī, lai viņiem vienmēr būtu pieejams svaigs ūdens.
            </p>
          </div>

          <div className="bg-light-gray p-6 rounded-md shadow-lg">
            <h3 className="text-2xl font-semibold text-accent-brown mb-4">
              Personība
            </h3>
            <p className="text-dark-brown text-lg">
              Meinkūns ir draudzīgs, neatkarīgs un sabiedrisks šķirnes kaķis.
              Viņi ir pazīstami ar savu spēlētprasmi un mīlestību pret
              cilvēkiem, kas padara viņus par lieliskiem mājas mīluļiem. Viņi ir
              sabiedriski, bet vienlaikus spēj būt neatkarīgi un labi iztikt
              vieni, ja nepieciešams.
            </p>
          </div>

          <div className="bg-light-gray p-6 rounded-md shadow-lg">
            <h3 className="text-2xl font-semibold text-accent-brown mb-4">
              Dzīves apstākļi
            </h3>
            <p className="text-dark-brown text-lg">
              Meinkūni ir piemēroti dzīvot plašās mājās vai dzīvokļos ar vietu,
              kur kāpt un spēlēties. Viņiem ir nepieciešama telpa, jo viņi ir
              aktīvi un mīl izpētīt apkārtni. Šie kaķi var labi pielāgoties gan
              iekštelpām, gan brīvdabai, bet viņiem patīk būt kopā ar cilvēkiem.
            </p>
          </div>

          <div className="bg-light-gray p-6 rounded-md shadow-lg">
            <h3 className="text-2xl font-semibold text-accent-brown mb-4">
              Noderīgi padomi
            </h3>
            <p className="text-dark-brown text-lg">
              Meinkūns var būt jūtīgs pret aukstumu un karstumu, bet parasti
              labi pielāgojas. Šīs šķirnes kaķiem ir nepieciešama liela uzmanība
              spalvas kopšanai, jo tai nepieciešama regulāra ķemmēšana. Turklāt
              šie kaķi mēdz baudīt ūdens rotaļas, kas ir neparasts kaķu vidū.
            </p>
          </div>
        </div>
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
