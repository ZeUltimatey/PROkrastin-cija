import { Sidebar } from "../instruction/Sidebar";

export const ProfileEdit = () => {
  return (
    <div className="flex min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="w-3/4 p-6">
        <section className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-dark-brown font-poppins">
            Profila rediģēšana
          </h3>
          <p className="mb-2 text-dark-brown font-poppins">
            Spiežot uz cilvēka ikonas lapas augšā - navigācijas labajā stūri
            tiek atvērta profila pārvaldīšanas lapa. Atverot šo lapu pa sadaļām
            ir sadalītas dažādas iestatījumu iespējas. Pirmā sadaļa, ko jūs
            varat rediģēt ir profila sadaļa. Šajā sadaļā ir arī poga "Iziet",
            kuru nospiežot jums ir iespēja iziet no sava profila. Spiežot uz
            pogas "Rediģēt profilu" jums paveras šādas rediģēšanas iespējas:
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Vārda maiņa:</strong> kad esat atvēris profila rediģēšanas
            informāciju jums tiek attēlots šobrīd norādītais vārds, bet ir
            iespēja to nodzēst un ierakstīt citu. Kad vēlamās izmaiņas ir
            veiktas, tad lai tās tiktu saglabātas jānospiež poga "Saglabāt", ja
            nu tomēr jūs neko nevēlas mainīt ir iespēja nospiest pogu "Atcelt"
            vai krusta ikonu, lai bez izmaiņu saglabāšanas tiktu aizvērta
            rediģēšanas forma.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Uzvārda maiņa:</strong> kad esat atvēris profila rediģēšanas
            informāciju jums tiek attēlots šobrīd norādītais uzvārds, bet ir
            iespēja to nodzēst un ierakstīt citu. Kad vēlamās izmaiņas ir
            veiktas, tad lai tās tiktu saglabātas jānospiež poga "Saglabāt", ja
            nu tomēr neko nevēlaties mainīt ir iespēja nospiest pogu "Atcelt"
            vai krusta ikonu, lai bez izmaiņu saglabāšanas tiktu aizvērta
            rediģēšanas forma.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>Lietotājvārda maiņa:</strong> kad esat atvēris profila
            rediģēšanas informāciju jums tiek attēlots šobrīd norādītais
            lietotājvārds, bet ir iespēja to nodzēst un ierakstīt citu. Kad
            vēlamās izmaiņas ir veiktas, tad lai tās tiktu saglabātas jānospiež
            poga "Saglabāt", ja nu tomēr neko nevēlaties mainīt ir iespēja
            nospiest pogu "Atcelt" vai krusta ikonu, lai bez izmaiņu
            saglabāšanas tiktu aizvērta rediģēšanas forma.
          </p>
          <p className="mb-2 text-dark-brown font-poppins">
            <strong>E-pasta maiņa:</strong> kad esat atvēris profila rediģēšanas
            informāciju jums tiek attēlots šobrīd norādītais e-pasts, bet ir
            iespēja to nodzēst un ierakstīt citu. Kad vēlamās izmaiņas ir
            veiktas, tad lai tās tiktu saglabātas jānospiež poga "Saglabāt", ja
            nu tomēr neko nevēlaties mainīt ir iespēja nospiest pogu "Atcelt"
            vai krusta ikonu, lai bez izmaiņu saglabāšanas tiktu aizvērta
            rediģēšanas forma. Bet, lai tiktu saglabāts jūsu jaunais norādītais
            e-pasts šo labojumu būs jāapstiprina ar paroli.
          </p>
        </section>

        <p className="mt-8 text-dark-brown font-poppins">
          Ja jums ir papildus jautājumi par profila rediģēšanu, lūdzu,
          sazinieties ar mums.
        </p>
      </div>
    </div>
  );
};
