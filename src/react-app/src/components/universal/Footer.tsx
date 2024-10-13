export const Footer = () => {
  return (
    <footer className="bg-content-white py-6 rounded-b-md">
      <div className="container mx-auto px-6">
        <div className="border-t border-dark-brown py-4 flex flex-col items-center">
          <nav className="mb-4 flex gap-6">
            <a
              href="contact"
              className="text-dark-brown hover:text-medium-brown"
            >
              Kontakti
            </a>
            <a href="/" className="text-dark-brown hover:text-medium-brown">
              Sākumlapa
            </a>
            <a
              href="policy"
              className="text-dark-brown hover:text-medium-brown"
            >
              Privātuma politika
            </a>
          </nav>
          <p className="text-sm text-dark-brown">&copy; 2024 Murrātava</p>
        </div>
      </div>
    </footer>
  );
};
