import { Sidebar } from "../instruction/Sidebar";

export const ContactUse = () => {
  return (
    <div className="flex min-h-screen bg-content-white bg-opacity-95">
      <Sidebar />
      <div className="w-3/4 p-6">
        <h2 className="mb-6 text-3xl font-bold text-dark-brown font-poppins">
          Kontaktformas lietošana
        </h2>
        <p className="mb-4 text-dark-brown font-poppins">
          Jums kājenes sadaļā ir iespējams atvērt kontaktu sadaļu, kur
          iespējams sazināties ar interneta veikala pārvaldību. Šajā sadāļā ir
          norādīta visa interneta veikala kontaktinformācija - tālrunis, e-pasta
          adrese, fiziskā adrese un tās darba laiks. Kā arī jums ir
          iespējams aizpildīt sazināšanās formu. Aizpildot formu ir jānorāda
          savs vārds, e-pasts un ziņojums, kuru vēlas iesniegt pārvaldei. Kad
          visi lauciņi ir aizpildīti tad, lai nosūtītu šo ziņojumu ir
          jāspiež poga "Sūtīt ziņu".
        </p>
      </div>
    </div>
  );
};
