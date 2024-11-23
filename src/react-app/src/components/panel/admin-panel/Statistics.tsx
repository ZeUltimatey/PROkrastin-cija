import { useEffect, useMemo, useState } from "react";
import { Constants } from "../../universal/Constants";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IOrder } from "./Orders";

export const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [transactions, setTransactions] = useState<IOrder[]>();
  const getStatistics = async () => {
    await fetch(`${Constants.API_URL}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setStatistics(data);
      }
    });
  };

  //horrendous; I am sorry, cba
  const getTransactions = async () => {
    await fetch(`${Constants.API_URL}/all_transactions?per_page=10&`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        await fetch(`${data.links.last}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              Constants.LOCAL_STORAGE.TOKEN
            )}`,
          },
        }).then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            setTransactions(data.data);
          }
        });
      }
    });
  };

  useEffect(() => {
    getStatistics();
    getTransactions();
  }, []);

  const columnHelper = createColumnHelper<IOrder>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor(
        (row) => `${row.transactor.name} ${row.transactor.surname}`,
        {
          id: "transactorFullName",
          header: "Vārds, uzvārds",
          cell: (info) => info.getValue(),
        }
      ),
      columnHelper.accessor("created_at", {
        header: "Pasūtīts",
        cell: (info) =>
          info.getValue().split("T")[0] +
          " " +
          info.getValue().split("T")[1].split(".")[0],
      }),
      columnHelper.accessor("total_pricing", {
        header: "Summa",
        cell: (info) => info.getValue().toFixed(2) + "€",
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: transactions,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });

  return (
    <div className="flex-1 bg-content-white">
      <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-dark-brown font-poppins">
            Statistika
          </h1>
          <button className="bg-medium-brown text-white px-4 min-w-48 hover:bg-opacity-85 transition-all py-2 rounded-lg font-poppins">
            <i className="fa-solid fa-download" /> Lejupielādēt excel
          </button>
        </div>
      </header>
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
            <h3 className="text-lg font-bold text-dark-brown font-poppins">
              Kopā pārdotais
            </h3>
            <p className="text-2xl mt-4 text-dark-brown">
              {statistics?.earnings ?? 0}&euro;
            </p>
          </div>
          <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
            <h3 className="text-lg font-bold text-dark-brown font-poppins">
              Pasūtījumi
            </h3>
            <p className="text-2xl mt-4 text-dark-brown">
              {statistics?.transactions ?? 0}
            </p>
          </div>
          <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
            <h3 className="text-lg font-bold text-dark-brown font-poppins">
              Pircēji
            </h3>
            <p className="text-2xl mt-4 text-dark-brown">
              {statistics?.clients ?? 0}
            </p>
          </div>
          <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
            <h3 className="text-lg font-bold text-dark-brown font-poppins">
              Produkti
            </h3>
            <p className="text-2xl mt-4 text-dark-brown">
              {statistics?.products ?? 0}
            </p>
          </div>
        </div>
        <div className="bg-light-gray shadow rounded-lg mt-10 border-2 border-medium-brown">
          <div className="p-6 border-b border-medium-brown">
            <h2 className="text-xl font-bold text-dark-brown font-poppins">
              Nesenie pirkumi
            </h2>
          </div>
          <div className="flex place-items-center justify-center flex-col gap-4">
            {transactions && (
              <table className="text-center font-poppins w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          className="h-12 bg-light-gray border-b border-light-brown text-dark-brown font-semibold"
                          key={header.id}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                              title={
                                header.column.getCanSort()
                                  ? header.column.getNextSortingOrder() ===
                                    "asc"
                                    ? "Sort ascending"
                                    : header.column.getNextSortingOrder() ===
                                      "desc"
                                    ? "Sort descending"
                                    : "Clear sort"
                                  : undefined
                              }
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: (
                                  <i className="fa-solid fa-chevron-up ml-2"></i>
                                ),
                                desc: (
                                  <i className="fa-solid fa-chevron-down ml-2"></i>
                                ),
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td
                            className="h-8 border-b border-light-brown bg-light-gray text-dark-brown font-semibold"
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
