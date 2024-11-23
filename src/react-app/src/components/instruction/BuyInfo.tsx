import { Sidebar } from "../instruction/Sidebar";

export const BuyInfo = () => {
  return (
    <div className="flex flex-col lg:flex-row  min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="lg:w-3/4 p-6">
        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Pasūtījuma veikšana
          </h3>
          <p className="pt-4 mb-2 text-dark-brown font-poppins">
            <strong>Pirkšana:</strong>Kad esat gatavs veikt pasūtījumu, jums
            jāatver groza lapa. Šeit būs jāaizpilda pasūtījuma informācija,
            tostarp:
          </p>
          <ul className="space-y-2 list-disc list-inside text-dark-brown font-poppins">
            <li>
              <strong>piegādes adrese:</strong> Jums jānorāda adrese uz kuru
              vēlas saņemt sūtījumu. Adresi var norādīt divos veidos -
              izvēlēties un atzīmēt kādu jau no iepriekš profilā saglabātajām
              adresēm vai spiežot pogu "Pievienot jaunu" pievienot un ievadīt
              jaunu adresi šajā pašā groza lapā.
            </li>
            <li>
              <strong>maksājuma informācija:</strong> Jums jānorāda informācija
              par maksājuma karti, kura tiks izmantota pasūtījuma atmaksāšanai.
              Kartes informāciju var norādīt 2 veidos - izvēlēties kādu no
              iepriekš profilā saglabātajām maksājuma metodēm vai spiežot pogu
              "Pievienot jaunu" pievienot jaunu maksājuma karti, ievadot kartes
              informāciju.
            </li>
            <li>
              <strong>pasūtījuma apstiprinājums:</strong>pirms pirkuma veikšanas
              jums tiek parādīts paziņojums, kur liek pārliecināties, ka visi
              dati ir pareizi, un tad jums jānospiež poga "Apstiprināt
              pasūtījumu", lai pasītījums tiktu noformēts.
            </li>
            <li>
              <strong>pasūtījuma čeks:</strong>kad būsiet apstiprinājis un
              veiksmīgi veicis pasūtījumu, tiksiet pārvirzīts un čeka lapu, kur
              būs parādīts čeks, kur iekļauta informācija par - pasūtītajiem
              produktiem, samaksāto summu, piegādes dienu, piegādes adresi un
              jūsu profila informācija - vārds, uzvārds.
            </li>
          </ul>
        </section>

        <p className="mt-8 text-dark-brown font-poppins">
          Ja jums ir papildus jautājumi par iepirkšanos un pasūtījuma veikšanu,
          lūdzu, sazinieties ar mums.
        </p>
      </div>
    </div>
  );
};
