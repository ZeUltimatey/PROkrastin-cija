import { Sidebar } from "../instruction/Sidebar";

export const OrderHistory = () => {
  return (
    <div className="flex min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="w-3/4 p-6">
        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Pasūtījumu vēsture
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            Jums profilā ir redzama pasūtījumu vēstures sadaļa. Šeit jums ir
            izvēle, ir iespējams apskatīt 2 jaunākos pasūtījumus un visus jebkad
            veiktos pasūtījumus. Tiek attēlota sekojoša informācija:
          </p>
          <ul className="space-y-2 list-disc list-inside text-dark-brown font-poppins">
            <li>
              <strong>Jaunākais pasūtījums:</strong> Tiek attēlota informācija -
              pasūtījuma numurs, sūtījuma statuss, pasūtījuma veikšanas datums
              un iespēja uzspiest uz pogas "Apskatīt", kur tiek atvērts logs,
              kurā ir detalizētāka informācija uzskaitot visas preces, kuras
              tika pasūtītas šajā sūtījumā un cenu, kura tika samaksāta pa
              sūtījumu. Lai aizvērtu šo logu jums ir iespēja spiest pogu
              "Aizvērt" loga apakšējā kreisā stūrī vai krusta ikonu augšējā
              labajā stūrī.
            </li>
            <li>
              <strong>Visi sūtījumi:</strong> pasūtījuma vēstures sadaļā spiežot
              uz pogas "Apskatīt visus sūtījumus" tiek atvērs logs, kur tiek
              attēloti visi jebkad veiktie pasūtījumi, tātad par katru sūtījumu
              tiek norādīts - pasūtījuma numurs, statuss, pasūtīšanas datums,
              pasūtītās preces un samaksātā summa. Lai aizvērtu šo logu jums ir
              iespēja spiest pogu "Aizvērt" loga apakšējā kreisā stūrī vai
              krusta ikonu augšējā labajā stūrī.
            </li>
          </ul>
        </section>

        <p className="mt-8 text-dark-brown font-poppins">
          Ja jums ir papildus jautājumi par pasūtīju vēstures apskatīšanu,
          lūdzu, sazinieties ar mums.
        </p>
      </div>
    </div>
  );
};
