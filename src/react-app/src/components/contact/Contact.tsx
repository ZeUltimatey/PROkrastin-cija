export const ContactInfo = () => {
  return (
    <div className="min-h-screen bg-content-white bg-opacity-95 p-6">
      <h2 className="text-4xl font-bold text-dark-brown font-poppins mb-8 text-center">
        Sazinieties ar mums
      </h2>
      <p className="text-lg text-dark-brown font-poppins mb-12 text-center">
        Vai jums ir jautājumi vai vēlaties saņemt papildu informāciju? Mēs esam
        šeit, lai palīdzētu! Lūdzu, sazinieties ar mums, izmantojot zemāk
        norādīto informāciju vai sazināšanās formu.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="pl-6">
          {" "}
          <h3 className="text-3xl font-semibold text-dark-brown font-poppins mb-6">
            Kontaktinformācija
          </h3>
          <ul className="text-dark-brown font-poppins space-y-4 text-lg">
            <li>
              <strong>Telefona numurs:</strong> +371 12 345 678
            </li>
            <li>
              <strong>E-pasta adrese:</strong> info@murratava.lv
            </li>
            <li>
              <strong>Adrese:</strong> Brīvības iela 123, Rīga, LV-1001, Latvija
            </li>
            <li>
              <strong>Darba laiks:</strong> P.-Pk. 9:00 - 18:00
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-dark-brown font-poppins mb-6">
            Sazināšanās forma
          </h3>
          <form className="space-y-6">
            <div>
              <label
                className="block text-dark-brown font-poppins mb-2"
                htmlFor="name"
              >
                Vārds:
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-4 border-2 border-dark-brown rounded-md focus:outline-none focus:border-medium-brown"
                placeholder="Ievadiet savu vārdu"
              />
            </div>
            <div>
              <label
                className="block text-dark-brown font-poppins mb-2"
                htmlFor="email"
              >
                E-pasts:
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-4 border-2 border-dark-brown rounded-md focus:outline-none focus:border-medium-brown"
                placeholder="Ievadiet savu e-pastu"
              />
            </div>
            <div>
              <label
                className="block text-dark-brown font-poppins mb-2"
                htmlFor="message"
              >
                Ziņojums:
              </label>
              <textarea
                id="message"
                className="w-full p-4 border-2 border-dark-brown rounded-md focus:outline-none focus:border-medium-brown"
                rows={5}
                placeholder="Ievadiet savu ziņojumu"
                style={{ height: "150px", resize: "none" }}
              />
            </div>
            <button
              type="submit"
              className="bg-light-brown hover:bg-medium-brown text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out"
            >
              Sūtīt ziņu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
