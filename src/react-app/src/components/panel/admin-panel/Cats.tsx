import { useEffect, useMemo, useState } from "react";
import { FormInput } from "../../universal/FormInput";
import { Constants } from "../../universal/Constants";
import { useToast } from "../../universal/Toast";
import { CategoryNames } from "../../universal/CategoryNames";
import { useConfirmation } from "../../universal/Confirmation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Breed } from "./Breeds";
import { Pagination } from "../../universal/Pagination";

const Cat = {
  breed_name: "",
  birthdate: "",
  color: "",
};

export const Product = {
  id: 0,
  display_name: "",
  description: "",
  pricing: 0,
  discount_pricing: null as number,
  breed_id: 0,
  image_url: "",
  stock: 1,
  product_type: CategoryNames.CATS,
  cat: Cat,
};

export const Cats = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(Product);
  const [cats, setCats] = useState<(typeof Product)[]>(null);
  const [breeds, setBreeds] = useState<(typeof Breed)[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pagination, setPagination] = useState(null);

  const showToast = useToast();

  const confirm = useConfirmation();

  const fetchCats = async (link?: string) => {
    await fetch(link ?? `${Constants.API_URL}/products?product_type=CATS`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setCats(data.data);
        setPagination(data.meta);
      } else {
        showToast(false, "Kļūda iegūstot kaķus.");
      }
    });
  };

  const fetchBreeds = async () => {
    await fetch(`${Constants.API_URL}/breeds`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        if (data.data.length > 0)
          setFormData({ ...formData, breed_id: data.data[0].id });
        setBreeds(data.data);
      } else {
        showToast(false, "Kļūda iegūstot šķirnes.");
      }
    });
  };

  useEffect(() => {
    fetchCats();
    fetchBreeds();
  }, []);

  const onProductEdit = async (id: number) => {
    setIsEditing(true);
    await fetch(`${Constants.API_URL}/products/${id}`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setFormData(data.data);
        setIsModalOpen(true);
      }
    });
  };

  const onProductDelete = async (id: number) => {
    if (await confirm("Dzēst kaķi?")) {
      await fetch(`${Constants.API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      }).then((response) => {
        if (response.ok) {
          showToast(true, "Kaķis veiksmīgi dzēsts!");
          setTimeout(() => window.location.reload(), 1000);
        } else {
          showToast(false, "Kļūda dzēšot kaķi.");
        }
      });
    }
    return;
  };

  const columnHelper = createColumnHelper<typeof Product>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("display_name", {
        header: "Nosaukums",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("cat.breed_name", {
        header: "Šķirne",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("pricing", {
        header: "Cena",
        cell: (info) => <div>{info.getValue()}&euro;</div>,
      }),
      columnHelper.accessor("cat.birthdate", {
        header: "Dz. datums",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("cat.color", {
        header: "Krāsa",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        header: "Darbības",
        cell: (info) => (
          <div className="flex gap-2 place-items-center justify-center">
            <button onClick={() => onProductEdit(info.row.original.id)}>
              <i className="fa-edit fa-solid"></i>
            </button>
            <button onClick={() => onProductDelete(info.row.original.id)}>
              <i className="fa-trash fa-solid"></i>
            </button>
          </div>
        ),
      }),
    ],
    [onProductEdit, onProductDelete]
  );

  const onFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/cats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify({
        ...formData,
        birthdate: formData.cat.birthdate,
        color: formData.cat.color,
      }),
    }).then((response) => {
      if (response.ok) {
        showToast(true, "Kaķis veiksmīgi pievienots!");
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda kaķa izveidē.");
      }
    });
    setIsLoading(false);
  };

  const onEditSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsEditing(false);
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/cats/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        showToast(true, "Produkts veiksmīgi atjaunināts!");
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda produkta atjaunināšanā.");
      }
    });
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData(Product);
  };

  const table = useReactTable({
    columns,
    data: cats,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 bg-content-white">
        <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-brown font-poppins">
              Kaķu saraksts
            </h1>
            <div>
              <button
                onClick={() => {
                  breeds?.length > 0
                    ? setIsModalOpen(true)
                    : showToast(
                        false,
                        "Nav šķirņu, lūdzu, pievienojiet šķirnu sadaļā!"
                      );
                }}
                className="bg-medium-brown text-white px-4 min-w-48 hover:bg-opacity-85 transition-all py-2 rounded-lg font-poppins"
              >
                <i className="fa-solid fa-plus" /> Pievienot kaķi
              </button>
            </div>
          </div>
        </header>
        <div className="flex place-items-center justify-center flex-col gap-4">
          {cats && (
            <table className="w-full text-center font-poppins">
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
                {table.getRowModel().rows.map((row) => (
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
                ))}
              </tbody>
            </table>
          )}
          {pagination && (
            <Pagination pagination={pagination} onNavigate={fetchCats} />
          )}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 relative overflow-auto ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                  Jauna kaķa pievienošana
                </h2>
                <button
                  onClick={closeModal}
                  className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
              <form
                onSubmit={isEditing ? onEditSubmit : onFormSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                    Kaķa nosaukums
                  </label>
                  <FormInput
                    placeholder="Ievadiet kaķa nosaukumu"
                    value={formData.display_name}
                    onChange={(e) =>
                      setFormData({ ...formData, display_name: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <div>
                    <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                      Cena (EUR)
                    </label>
                    <FormInput
                      placeholder="Ievadiet kaķa cenu"
                      value={formData.pricing}
                      onChange={(e) =>
                        setFormData({ ...formData, pricing: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                      Atlaide?
                    </label>
                    <input
                      placeholder="Ievadiet kaķa cenu"
                      type="checkbox"
                      className="w-8 h-8 mx-3 my-2 accent-accent-brown"
                      checked={formData.discount_pricing !== null}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          discount_pricing:
                            formData.discount_pricing !== null ? null : 0,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                      Cena <u>pēc</u> atlaides (EUR)
                    </label>
                    <FormInput
                      placeholder="Cena pēc atlaides"
                      value={formData.discount_pricing}
                      disabled={formData.discount_pricing === null}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discount_pricing: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                    Apraksts
                  </label>
                  <textarea
                    className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                    rows={4}
                    placeholder="Ievadiet aprakstu"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-full">
                    <label className="text-sm text-dark-brown font-semibold font-poppins mb-1">
                      Šķirne
                    </label>
                    <select
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          breed_id: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 w-full px-4 py-2 border bg-transparent font-poppins border-gray-300 rounded-md shadow-sm"
                    >
                      {Object.keys(breeds).map((breed, key) => {
                        return (
                          <option
                            className="font-poppins"
                            key={key}
                            value={breeds[key].id}
                          >
                            {breeds[key].display_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                      Krāsa
                    </label>
                    <FormInput
                      placeholder="Ievadiet kaķa krāsu"
                      value={formData.cat.color}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cat: { ...formData.cat, color: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                    Dzimšanas datums
                  </label>
                  <FormInput
                    placeholder="Ievadiet kaķa krāsu"
                    type="date"
                    value={formData.cat.birthdate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cat: { ...formData.cat, birthdate: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                    Augšupielādēt attēlu
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm "
                  />
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
    </div>
  );
};
