import { useEffect, useMemo, useState } from "react";
import { IUser } from "../../universal/interfaces/IUser";
import { Constants } from "../../universal/Constants";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "../../universal/Pagination";

export interface IOrder {
  id: number;
  created_at: string;
  total_pricing: number;
  check_content: string;
  transactor: IUser;
  location: {
    city: string;
    street: string;
    apartment_number: string;
    zip_code: string;
  };
}

export const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [orders, setOrders] = useState<IOrder[]>(null);
  const [pagination, setPagination] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const fetchOrders = (url?: string) => {
    fetch(url ?? `${Constants.API_URL}/all_transactions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setPagination(data.meta);
        setOrders(data.data);
      }
    });
  };

  const downloadPdf = (transactionId: number) => {
    fetch(
      `${Constants.API_URL}/transaction_pdf?transaction_id=${transactionId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      }
    ).then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Pasutijums_${transactionId}.pdf`;
        a.click();
      });
    });
  };

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
      columnHelper.display({
        header: "PDF",
        cell: (info) => (
          <button onClick={() => downloadPdf(info.row.original.id)}>
            <i className="fa-download fa-solid"></i>
          </button>
        ),
      }),
    ],

    []
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const table = useReactTable({
    columns,
    data: orders,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });

  return (
    <div className="min-h-screen flex bg-content-white w-full">
      <div className="flex-1">
        <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-brown font-poppins">
              Pasūtījumi
            </h1>
          </div>
        </header>

        <div className="flex place-items-center justify-center flex-col gap-4">
          {orders && (
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
                                ? header.column.getNextSortingOrder() === "asc"
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
          {pagination && (
            <Pagination pagination={pagination} onNavigate={fetchOrders} />
          )}
        </div>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-dark-brown mb-4 font-poppins">
              Pasūtījuma detaļas
            </h2>

            <div className="flex justify-end space-x-4">
              <button
                className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                onClick={closeModal}
              >
                Aizvērt
              </button>
              {/* {selectedOrder.status !== "Cancelled" && (
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-poppins"
                  onClick={handleCancelOrder}
                >
                  Atcelt pasūtījumu
                </button>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
