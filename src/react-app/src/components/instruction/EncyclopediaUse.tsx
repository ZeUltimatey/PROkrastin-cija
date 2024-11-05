import { Sidebar } from "../instruction/Sidebar";

export const EncyclopediaUse = () => {
  return (
    <div className="flex min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="w-3/4 p-6">
        <h2 className="mb-6 text-3xl font-bold text-dark-brown font-poppins">
          Kaķu šķirņu enciklopēdijas lietošanas pamācība
        </h2>
        <p className="mb-4 text-dark-brown font-poppins">
          Interneta veikalā ir pieejama šķirņu enciklopēdija, kurā var uzzināt
          vairāk par dažādām kaķu šķirnēm pirms kaķa iegādes.
        </p>

        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Informācijas meklēšana
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Meklēšanas funkcija:</strong> Iespējams meklēt šķirnes,
            izmantojot meklēšanas joslu vai pārlūkojot šķirņu sarakstu, kas
            atrodas ekrāna labajā pusē.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Šķirņu izvēlne:</strong> ekrāna labajā pusē ir izvēlne, kur
            iespējams atzīmēt šķirnes, kuras vēlaties, lai parāda. Veikt izvēli
            var, ar peles klikšķi atzīmējot šķirnes, kuras vēlaties redzēt.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Šķirnes apskate
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            Apskatīt šķirni var, ar peles klikšķi uzspiežot uz attiecīgās
            šķirnes raksta konteinera, kur redzams šķirnes attēls, nosaukums un
            īss apraksts. Kad tiek atvērts konkrētais raksts, Jums ir iespēja
            iepazīties ar sekojošu informāciju par kaķa šķirni:
          </p>
          <ul className="space-y-2 list-disc list-inside text-dark-brown font-poppins">
            <li>
              <strong>Barošana:</strong> informācija par ieteicamajiem šķirnes
              ēšanas paradumiem un barību.
            </li>
            <li>
              <strong>Personība:</strong> kāds ir šķirnes raksturs un uzvedība.
            </li>
            <li>
              <strong>Dzīves apstākļi:</strong> ieteikumi par kopšanu,
              dzīvošanas apstākļiem un nepieciešamībām.
            </li>
            <li>
              <strong>Noderīgi padomi:</strong> ieteikumi, kā vieglāk adaptēties
              jauna kaķa saimniekam.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Piekļuve enciklopēdijai
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Pirkšanas lapā:</strong> ja esat atvēris kaķa pirkšanas lapu
            un vēlaties uzzināt vairāk par konkrēto šķirni pirms iegādes, jums
            ir iespēja uzspiest uz pogas "Lasīt par šķirni". Šī poga aizvedīs uz
            šķirnes enciklopēdijas rakstu tieši par izvēlēto šķirni.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Navigācijas josla:</strong> ja Jūs vēlaties lasīt šķirņu
            enciklopēdiju,ir iespēja navigācijas joslā uzspiest uz grāmatas
            ikonas, kas atvērs šo sadaļu.
          </p>
        </section>

        <p className="mt-8 text-dark-brown font-poppins">
          Ja jums ir papildus jautājumi par enciklopēdijas lietošanu, lūdzu,
          sazinieties ar mums.
        </p>
      </div>
    </div>
  );
};
