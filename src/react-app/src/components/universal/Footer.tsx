export const Footer = () => {
  return (
    <footer className="bg-content-white py-6">
      <div className="container mx-auto px-6">
        <div className="border-t border-dark-brown py-4">
          <div className="text-center text-dark-brown">
            <nav className="mb-4">
              <a
                href="/"
                className="mx-4 text-dark-brown hover:text-medium-brown"
              >
                Sākumlapa
              </a>
              <a
                href="contact"
                className="mx-4 text-dark-brown hover:text-medium-brown"
              >
                Kontaktinformācija
              </a>
              <a
                href="policy"
                className="mx-4 text-dark-brown hover:text-medium-brown"
              >
                Privātuma politika
              </a>
            </nav>
            <p className="text-sm text-dark-brown">&copy; 2024 Murrātava</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
