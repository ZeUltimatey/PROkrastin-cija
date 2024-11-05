import { Sidebar } from "../instruction/Sidebar";

export const BrowseInfo = () => {
  return (
    <div className="flex min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="w-3/4 p-6">
        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Preču izvēle
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Kategorijas:</strong> Interneta veikals ir strukturēts pa
            kategorijām, kas ļauj viegli atrast nepieciešamās preces. Ar peles
            klikšķi uz attiečigo kateogriju jūs varat izvēlēties starp:
          </p>
          <ul className="space-y-2 list-disc list-inside text-dark-brown font-poppins">
            <li>
              <strong>Kaķi:</strong> Iespēja apskatīt pieejamos kaķus, kurus var
              adoptēt.
            </li>
            <li>
              <strong>Barība:</strong> Sausās un mitrās barības, kārumi, kā arī
              īpašas diētas produkti.
            </li>
            <li>
              <strong>Kopšana:</strong> Viss nepieciešamais, lai koptu kaķi -
              ķemmes, šķēres, šampūni un citi produkti.
            </li>
            <li>
              <strong>Rotaļlietas:</strong> Iespēja iegādāties mīlulim dažāda
              veida izklaides, lai nodrošinātu labsajūtu.
            </li>
            <li>
              <strong>Mēbeles:</strong>Dažāda veida mēbeles paredzētas kaķiem,
              lai nodrošinātu tiem ērtu dzīvi.
            </li>
            <li>
              <strong>Aksesuāri:</strong>kakla siksnas, drēbes un cita veida
              aksesuāri, lai padarītu savu kaķi stilīgu.
            </li>
          </ul>
          <p className="pt-4 mb-3 text-dark-brown font-poppins">
            Šīs kategorijas lietotājs interneta veikalā var izvēlēties 2 veidos
            -
          </p>

          <ul className="space-y-2 list-disc list-inside text-dark-brown font-poppins">
            <li>
              Lapas augšpusē, navigācijas logā ir poga Kategorijas uz kuras
              uzbraucot ar peles kursoru parādās visas šīs kategorijas un ir
              iespēja ar klikšķi atvērt konkrēto sadaļu. Spiežot vienkārši uz
              pogu Kategorijas tiek atvērts pilnais preču katalogs bez atsevišķa
              kategoriju filtra.
            </li>
            <li>
              Sākumlapā jums ir iespēja pavirzīties uz leju, kur būs attēli, kas
              kalpo kā pogas, lai izvēlētos kādu kategoriju vēlaties apskatīt.
              Attēli ir atbilstoši saprotami, kurai kategorijai tie atbilst, kā
              arī virsū ir kategorijas nosaukums. Spiežot uz šī attēla, tiks
              atvērt attiecīgās kategorijas sadaļa produktu katalogā. Kā arī
              blakus šīm kategorijām ir poga "Apskatīt visas preces", kas
              aizvedīs uz pilno produktu katalogu.
            </li>
          </ul>
          <p className="pt-4 mb-2 text-dark-brown font-poppins">
            <strong>Īpašie piedāvājumi:</strong> Interneta veikala sākumlapā
            tiek parādīti īpašie piedāvājumi, kuriem ir akcijas cena. Šos
            produktus grozam par pievienot tieši tā pat kā produktus no preču
            kataloga. Lasiet par šo vairāk pie produktu iegādes.
          </p>
          <p className="pt-4 mb-2 text-dark-brown font-poppins">
            <strong>Produktu apskatīšana:</strong> Katrs produkts tiek attēlots
            ar attēlu, nosaukumu un cenu. Uz katra produkta uzbraucot ar peles
            kursoru, attēla augšā parādās poga – Pievienot grozam, nospiežot šo
            pogu produkts tiek ielikts jūsu iepirkuma grozā. Savukārt, ja jūs
            nospiežat uz attēla, tiek atvērta produkta lapa. Produkta lapā jūs
            saskarsieties ar sekojošiem elementiem:
          </p>
          <ul className="space-y-2 list-disc list-inside text-dark-brown font-poppins">
            <li>
              <strong>produkta attēls:</strong> Jūs varat lielākā izmērā
              apskatīt sev interesējošo produktu.
            </li>
            <li>
              <strong>produkta apraksts:</strong> šajā lapā jums ir iespēja
              iepazīties ar detalizētu produkta aprakstu un attiecīgajām
              specifikācijām.
            </li>
            <li>
              <strong>atsauksmes:</strong> jums viegli saprotamā veidā tiek
              attēlots produkta vērtējums no citiem pircējiem 5 zvaigžņu skalā.
              Kā arī, spiežot ar peles kursoru uz pogu ar vārdu atsauksmes, jūs
              tiekat aizvest uz lapu, kur iespējams izlasīt, ko tieši citi
              pircēji raksta par šo produktu, kā arī jums ir iespēja pievienot
              savu atsauksmi un zvaigžņu vērtējumu.
            </li>
            <li>
              <strong>pirkšanas iespēja:</strong> šajā lapā jums tiek dota
              izvēle pievienot produktu savam iepirkuma grozam. Pieejamas ir
              pogas daudzuma mainīšanai, ar pogu "+" iespējams palielināt
              produkta skaitu un ar pogu "-" samazināt skaitu (tas nevar būt
              zemāks par 0), kad esat izvēlējies vēlamo daudzumu var spiest uz
              pogas "Pievienot grozam", lai tas tiktu pievienots iepirkuma
              grozā.
            </li>
          </ul>
          <p className="pt-4 mb-2 text-dark-brown font-poppins">
            <strong>Meklēšanas funkcija:</strong> Ir iespējams lietot meklēšanas
            joslu gan katalogā, gan navigācijas joslā, lai ātri atrastu
            konkrētas preces. Ievadot atslēgvārdu, piemēram, "kaķu barība" vai
            "spēļu rotaļlieta".
          </p>
        </section>

        <p className="mt-8 text-dark-brown font-poppins">
          Ja jums ir papildus jautājumi par preču meklēšanu un apskatīšanu,
          lūdzu, sazinieties ar mums.
        </p>
      </div>
    </div>
  );
};
