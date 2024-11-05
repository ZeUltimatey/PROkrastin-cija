import { Sidebar } from "./Sidebar";

export const ProfileSettings = () => {
  return (
    <div className="flex min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="w-3/4 p-6">
        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Profila iestatījumi
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            Jums ir iespēja iestatīt dažādus profila ieatatījumus, lai pielāgotu
            interneta veikalu savām vajadzībām.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>E-pasta paziņojumi:</strong> Jums ir iespēja atzīmēt, to, ka
            vēlaties uz e-pastu saņemt paziņojumus no interneta veikala. To var
            izdarīt ar peles klikšķi uzspiežot uz kastītes pretī tekstam -
            "Saņemt e-pasta paziņojumus".
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Lietotāja preferences:</strong> Jums ir iespēja atzīmēt,
            kādas preferences vēlaties, iespējams atzīmet, ka vienmēr tiks
            rādīti vispirms lētākie piedāvājumi, kas nozīmē, ka produktu
            katalogā vienmēr tiks iespējots filtrs, kur lētākie produkti tiks
            parādīti pirmie. Iespējams ir iepsējot arī to, ka jums katalogā tiek
            parādīti tikai produkti ar bezmaksas piegādi. Vēl ir iespējams
            iespējot opciju, kur tiek parādīti tikai pieejamie produkti, kurus
            var uzreiz pasūtīt. Kā āri ir iespēja parādīt tikai produktus, kuri
            ir vietējo ražotāju. Visas šīs opcijas ir iespējams iespējot
            uzspiežot uz kastītes, kas iespējo šīs opcijas un spiežot pogu
            "Saglabāt", lai saglabātu izvēlētās preferences. Ja tomēr neko
            nevēlaties koriģēt, tad logu iespējams aizvērt spiežot apakšā pogu
            "Atcelt" vai loga augšā krusta ikonu.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Paroles maiņa:</strong> Ja vēlaties mainīt paroli jums
            jāspiež uz pogas "Mainīt paroli", kas atrodas zem sadaļas parole.
            Kad šī poga tiek nospiesta atveras modulis, kur jānorāda esošā
            parole, jaunā parole un atkārtota jaunā parole. Kad šī informācija
            ir ievadīta, lai saglabātu izmaiņas jāspiež poga "Saglabāt", bet ja
            tomēr nevēlaties mainīt paroli, moduli var aizvērt spiežot uz moduļa
            apakšā esošās pogas "Atcelt" vai augšā uz krusta ikonas.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Dzēst kontu:</strong> Jums ir iespēja neatgriezeniski
            izdzēst savu profilu spiežot uz sarkanās pogas ar atkrituma tvertnes
            ikonu un tekstu "Dzēst kontu". Nospiežot šo pogu parādās
            paziņojumus, kur tiek teikts, ka šī darbība ir neatgriezeniska un
            konts tiks dzēsts uz visiem laikiem. Jums ir iespēja piekrist
            spiežot uz pogas "Jā, dzēst" un profils tiks dzēsts uz visiem
            laikiem vai arī pārdomāt un spiest pogu "Nē", ka tomēr profilu
            nevēlaties dzēst.
          </p>
        </section>

        <p className="mt-8 text-dark-brown font-poppins">
          Ja jums ir papildus jautājumi par profila pārvaldīšanu, lūdzu,
          sazinieties ar mums.
        </p>
      </div>
    </div>
  );
};
