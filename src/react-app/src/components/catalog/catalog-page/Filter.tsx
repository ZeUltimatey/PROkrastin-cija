export const Filter = () => {
    return (
      <div className="flex flex-col gap-6 bg-white p-6 rounded-md shadow-md w-full lg:w-64">
        <label htmlFor="category" className="text-dark-brown font-semibold">
          Izvēlieties kategoriju:
        </label>
        <select
          id="category"
          className="bg-white border border-gray-300 text-dark-brown px-4 py-2 rounded-md focus:ring focus:ring-light-brown"
        >
          <option value="all">Visas kategorijas</option>
          <option value="toys">Rotaļlietas</option>
          <option value="food">Barība</option>
          <option value="beds">Gultas</option>
          <option value="accessories">Aksesuāri</option>
        </select>

        <label htmlFor="price-sort" className="text-dark-brown font-semibold">
          Kārtot pēc cenas:
        </label>
        <select
          id="price-sort"
          className="bg-white border border-gray-300 text-dark-brown px-4 py-2 rounded-md focus:ring focus:ring-light-brown"
        >
          <option value="asc">No zemākās uz augstāko</option>
          <option value="desc">No augstākās uz zemāko</option>
        </select>
      </div>
    );
};