import { Sidebar } from "../instruction/Sidebar";

export const PayMethods = () => {
  return (
    <div className="flex flex-col lg:flex-row  min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="lg:w-3/4 p-6">
        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Saglabātās maksājuma metodes
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            Jums ir iespēja pievienot, rediģēt un dzēst maksājuma metodes, lai
            nodrošinātu ērtāku iepirkšanos.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Jaunas maksājuma kartes pievienošana:</strong> Jums ir
            iespēja pievienot vairākas maksājuma kartes. Spiežot uz pogas
            "Pievienot jaunu", jums ir jānorāda kartes īpašnieka vārds, kartes
            numurs un derīguma termiņš . Kad informācija ir aizpildīta, lai to
            saglabātu un profilam pievienotu maksājuma karti jāspiež poga
            "Saglabāt", ja tomēr esat pārdomājis un nevēlaties pievienot karti,
            šo logu var aizvērt nepievienojot karti spiežot pogu "Atcelt" loga
            apakšā vai krusta ikonu loga augšā.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Maksājuma metodes dzēšana:</strong> iepriekš pievienoto
            maksājuma metodi ir iespējams dzēst spiežot uz atkritumu tvertnes
            ikonas, kura atrodas pretī maksājuma metodes informācijai. Kad šī
            ikona tiek nospiesta iepriekš saglabātā maksājuma metode tiek dzēsta
            un jums parādās veiksmīga dzešanas procesa paziņojums.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Maksāšanas izvēle pasūtījumam:</strong> Veicot pasūtījumu,
            jūs varat izvēlēties iepriekš saglabātu maksāšanas metodi, lai
            paātrinātu procesu. Bet ja šī metode nav iepriekš profilā saglabāta
            arī pasūtījuma veikšanas laikā ir iespējams pievienot jaunu
            maksājuma karti spiežot pogu "Pievienot jaunu" pie kartes ikonas.
          </p>
        </section>

        <p className="mt-8 text-dark-brown font-poppins">
          Ja jums ir papildus jautājumi par maksājuma metodēm, lūdzu,
          sazinieties ar mums.
        </p>
      </div>
    </div>
  );
};
