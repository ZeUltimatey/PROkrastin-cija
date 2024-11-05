import { Sidebar } from "../instruction/Sidebar";

export const BasketInfo = () => {
  return (
    <div className="flex min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="w-3/4 p-6">
        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Preču pievienošana grozam
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Pievienošana grozam:</strong> Kad esat izvēlējies vēlamo
            preci, uzbraucot ar peles kursoru uz preces parādās poga "Pievienot
            grozam". Prece tiks pievienota jūsu grozam. Lapas augšējā sadaļā -
            navigācijā atrodas groza ikona, kurā iespējams apskatīt pievienotās
            preces.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Groza apskate:</strong> Lai pārbaudītu groza saturu, jums ir
            jānoklikšķina uz groza ikonas augšējā labajā stūrī. Šeit iespējams
            redzēt, ko esat pievienojis, ir iespēja mainīt daudzumu izmantojot
            pogu "-", lai samazinātu daudzuma skaitu un "+", lai palielinātu
            preces daudzumu vai noņemt preces klikšķinot uz krusta ikonas.
          </p>
        </section>

        <p className="mt-8 text-dark-brown font-poppins">
          Ja jums ir papildus jautājumi par preču pievienošanu grozam, lūdzu,
          sazinieties ar mums.
        </p>
      </div>
    </div>
  );
};
