export const Sidebar = () => {
  return (
    <div className="min-h-screen flex rounded-md ">
      <aside className="w-64 bg-light-gray text-white p-8">
        <div className="text-2xl font-bold mb-8 font-poppins text-dark-brown">
          Administrātora panelis
        </div>
        <nav>
          <ul className="space-y-4 text-dark-brown">
            <li className="hover:bg-medium-brown p-3 rounded-lg cursor-pointer">
              Statistika
            </li>
            <li className="hover:bg-medium-brown p-3 rounded-lg cursor-pointer">
              Produkti
            </li>
            <li className="hover:bg-medium-brown p-3 rounded-lg cursor-pointer">
              Pasūtijumi
            </li>
            <li className="hover:bg-medium-brown p-3 rounded-lg cursor-pointer">
              Lietotāji
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};
