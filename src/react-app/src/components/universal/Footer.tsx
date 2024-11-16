export const Footer = () => {
  return (
    <footer className="py-6 bg-content-white rounded-b-md font-poppins">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center py-4 border-t border-dark-brown">
          <nav className="flex flex-col lg:flex-row  gap-6 mb-4 text-center">
            <a
              href="/contact"
              className="text-dark-brown hover:text-medium-brown"
            >
              Kontakti
            </a>
            <a href="/" className="text-dark-brown hover:text-medium-brown">
              Sākumlapa
            </a>
            <a
              href="/policy"
              className="text-dark-brown hover:text-medium-brown"
            >
              Privātuma politika
            </a>
            <a
              href="/instruction/encyclopediause"
              className="text-dark-brown hover:text-medium-brown"
            >
              Lietotāja instrukcija
            </a>
          </nav>
          <p className="text-sm text-dark-brown">&copy; 2024 Murrātava</p>
        </div>
      </div>
    </footer>
  );
};
