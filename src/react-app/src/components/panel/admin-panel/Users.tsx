import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Constants } from "../../universal/Constants";
import { FormInput } from "../../universal/FormInput";
import { useToast } from "../../universal/Toast";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IUser } from "../../universal/interfaces/IUser";

export const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useToast();

  const handleEditClick = (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const getAllUsers = async () => {
    await fetch(`${Constants.API_URL}/all_users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    });
  };

  const onUserUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/users/update/${selectedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(selectedUser),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUsers((prev) =>
          prev.map((user) => (user.id === data.id ? data : user))
        );
        closeModal();
        setIsLoading(false);
        showToast(true, "Lietotājs atjaunots!");
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  };

  const columnHelper = createColumnHelper<IUser>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: "Vārds",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("surname", {
        header: "Uzvārds",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "E-pasts",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("created_at", {
        header: "Reģistrēts",
        cell: (info) => info.getValue().slice(0, 10),
      }),
      columnHelper.accessor("deactivated", {
        header: "Statuss",
        cell: (info) => (info.getValue() ? "Bloķēts" : "Aktīvs"),
      }),
      columnHelper.display({
        header: "Darbības",
        cell: (info) => (
          <button onClick={() => handleEditClick(info.row.original)}>
            <i className="fa-edit fa-solid"></i>
          </button>
        ),
      }),
    ],
    [handleEditClick]
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });

  return (
    <div className="bg-content-white w-full">
      <div className="flex-1">
        <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-brown font-poppins">
              Lietotāji
            </h1>
          </div>
        </header>

        {users && (
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
                                : header.column.getNextSortingOrder() === "desc"
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
                if (row.original.user_role == "Admin") return;

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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-dark-brown mb-4 font-poppins">
              Rediģēt lietotāju
            </h2>
            <form onSubmit={onUserUpdate}>
              <div className="flex gap-2">
                <div className="mb-2">
                  <label className="block text-dark-brown font-poppins">
                    Vārds:
                  </label>
                  <FormInput
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-dark-brown font-poppins">
                    Vārds:
                  </label>
                  <FormInput
                    value={selectedUser.surname}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        surname: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-dark-brown font-poppins">
                  E-pasts:
                </label>
                <FormInput
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-dark-brown font-poppins">
                  Statuss:
                </label>
                <select
                  className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm"
                  value={selectedUser?.deactivated ? "Bloķēts" : "Aktīvs"}
                  onChange={(e) => {
                    setSelectedUser({
                      ...selectedUser,
                      deactivated: e.target.value === "Bloķēts" ? 1 : 0,
                    });
                  }}
                >
                  <option value="Aktīvs">Aktīvs</option>
                  <option value="Bloķēts">Bloķēts</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={closeModal}
                  className="bg-light-gray text-dark-brown hover:bg-opacity-70 px-4 py-2 rounded-md shadow font-poppins"
                >
                  Atcelt
                </button>
                <input
                  type="submit"
                  value="Saglabāt"
                  disabled={isLoading}
                  className={`${
                    isLoading
                      ? "bg-gray-200 hover:cursor-not-allowed"
                      : "hover:cursor-pointer bg-medium-brown hover:bg-opacity-70"
                  }   text-white px-6 py-2 rounded-md shadow font-poppins`}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
