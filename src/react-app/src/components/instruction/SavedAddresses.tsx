import { Sidebar } from "../instruction/Sidebar";

export const SavedAddresses = () => {
  return (
    <div className="flex flex-col lg:flex-row  min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="lg:w-3/4 p-6">
        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Saglabātās adreses
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            Jums ir iespēja pievienot, rediģēt un dzēst adreses, lai nodrošinātu
            ērtāku iepirkšanos.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Jaunas adreses pievienošana:</strong> Jums ir iespēja
            pievienot vairākas piegādes adreses. Spiežot uz pogas "Pievienot
            jaunu", jums ir jānorāda nosaukums ar kādu vēlaties saglabāt adresi,
            pilsēta, iela, dzīvokļa vai mājas numurs un pasta indekss. Kad
            informācija ir aizpildīta, lai to saglabātu un profilam pievienotu
            adresi jāspiež poga "Izveidot", ja tomēr esat pārdomājis un
            nevēlaties pievienot adresi, šo logu var aizvērt nepievienojot
            adresi spiežot pogu "Atcelt" loga apakšā vai krusta ikonu loga
            augšā.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Adreses rediģēšana:</strong> iepriekš pievienoto adresi ir
            iespējams rediģēt spiežot uz zīmuļa ikonas, kura atrodas pretī
            adresei. Kad šī ikona tiek nospiesta atveras logs, kur parādās
            iepriekš ierakstītā informācija, jums ir iespējams šo informāciju
            nomainīt. Kad informācija ir izlabota, lai to saglabātu un profilā
            tiktu rediģēta šī adrese jāspiež poga "Saglabāt", ja tomēr esat
            pārdomājis un nevēlaties rediģēt adresi, šo logu var aizvērt
            neveicot izmaiņas adresē spiežot pogu "Atcelt" loga apakšā vai
            krusta ikonu loga augšā.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Adreses dzēšana:</strong> iepriekš pievienoto adresi ir
            iespējams dzēst spiežot uz atkritumu tvertnes ikonas, kura atrodas
            pretī adresei. Kad šī ikona tiek nospiesta iepriekš saglabātā adrese
            tiek dzēsta un jums parādās veiksmīga dzešanas procesa paziņojums.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Adreses izvēle pasūtījumam:</strong> Veicot pasūtījumu, jūs
            varat izvēlēties iepriekš saglabātu adresi, lai paātrinātu procesu.
            Bet ja šī adrese nav iepriekš profilā saglabāta, arī pasūtījuma
            veikšanas laikā ir iespējams pievienot jaunu adresi spiežot uz pogas
            "Pievienot" pie kartes ikonas.
          </p>
        </section>

        <p className="mt-8 text-dark-brown font-poppins">
          Ja jums ir papildus jautājumi par adrešu saglabāšanu, lūdzu,
          sazinieties ar mums.
        </p>
      </div>
    </div>
  );
};
