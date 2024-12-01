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
import { Pagination } from "../../universal/Pagination";
import { IProduct } from "../../universal/interfaces/IProduct";

export const Product = {
  id: 0,
  display_name: "",
  description: "",
  pricing: 0,
  discount_pricing: null as number,
  product_type: "FOOD",
  stock: 0,
  image_url: null as any,
  images: { images: [] as { id: number; url: string }[] },
};

export const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(Product);
  const [products, setProducts] = useState<IProduct[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pagination, setPagination] = useState(null);

  const showToast = useToast();

  const confirm = useConfirmation();

  const fetchProducts = async (link?: string) => {
    await fetch(link?.length > 0 ? link : `${Constants.API_URL}/products`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data);
        setPagination(data.meta);
      } else {
        showToast(false, "Kļūda iegūstot produktus.");
      }
    });
  };

  useEffect(() => {
    fetchProducts();
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
    if (await confirm("Dzēst produktu?")) {
      await fetch(`${Constants.API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      }).then((response) => {
        if (response.ok) {
          showToast(true, "Produkts veiksmīgi dzēsts!");
          setTimeout(() => window.location.reload(), 1000);
        } else {
          showToast(false, "Kļūda dzēšot produktu.");
        }
      });
    }
    return;
  };

  const columnHelper = createColumnHelper<IProduct>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("display_name", {
        header: "Nosaukums",
        cell: (info) => (
          <a
            href={`/product/${info.row.original.id}`}
            className="hover:underline"
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("product_type", {
        header: "Produkta tips",
        cell: (info) =>
          CategoryNames[info.getValue() as keyof typeof CategoryNames],
      }),
      columnHelper.accessor("pricing", {
        header: "Cena",
        cell: (info) => <div>{info.getValue().toFixed(2)}&euro;</div>,
      }),
      columnHelper.accessor("discount_pricing", {
        header: "Atlaide",
        cell: (info) => <div>{info.getValue()?.toFixed(2) ?? "- "}&euro;</div>,
      }),
      columnHelper.accessor("stock", {
        header: "Daudzums",
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
    await fetch(`${Constants.API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(formData),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        showToast(true, "Produkts veiksmīgi pievienots!");
        if (formData.image_url) {
          await handlePictureAdd(data);
        }
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda produkta izveidē.");
      }
    });
    setIsLoading(false);
  };

  const handlePictureAdd = async (id: number) => {
    const imageData = new FormData();
    Array.from(formData.image_url).forEach((image: any, index: number) => {
      imageData.append(`images[${index}]`, image);
    });
    console.log(formData.image_url);
    await fetch(`${Constants.API_URL}/products/${id}/images/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: imageData,
    });
  };

  const onEditSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsEditing(false);
    setIsLoading(true);
    if (formData.image_url) {
      await handlePictureAdd(formData.id);
    }
    await fetch(`${Constants.API_URL}/products/${formData.id}`, {
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

  const deleteImage = async (
    e: { preventDefault: () => void },
    url: string
  ) => {
    e.preventDefault();
    if (await confirm("Dzēst bildi?")) {
      fetch(
        `${Constants.API_URL}/products/${formData.id}/images/remove/${url}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              Constants.LOCAL_STORAGE.TOKEN
            )}`,
          },
        }
      ).then((response) => {
        if (response.ok) {
          showToast(true, "Bilde veiksmīgi dzēsta!");
          setTimeout(() => window.location.reload(), 1000);
        }
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData(Product);
  };

  const table = useReactTable({
    columns,
    data: products,
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
              Produktu saraksts
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-medium-brown text-white px-4 min-w-48 hover:bg-opacity-85 transition-all py-2 rounded-lg font-poppins"
            >
              <i className="fa-solid fa-plus" /> Pievienot produktu
            </button>
          </div>
        </header>
        <div className="flex place-items-center justify-center flex-col gap-4">
          {products && (
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
                  if (row.original.product_type == "CATS") return;
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
            <Pagination pagination={pagination} onNavigate={fetchProducts} />
          )}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 relative overflow-auto ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                  Jauna produkta pievienošana
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
                    Produkta nosaukums
                  </label>
                  <FormInput
                    placeholder="Ievadiet produkta nosaukumu"
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
                      placeholder="Ievadiet produkta cenu"
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
                      placeholder="Ievadiet produkta cenu"
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
                      Produkta kategorija
                    </label>
                    <select
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          product_type: e.target.value,
                        })
                      }
                      className="mt-1 w-full px-4 py-2 border bg-transparent font-poppins border-gray-300 rounded-md shadow-sm"
                    >
                      {Object.keys(CategoryNames).map((key) => {
                        const categoryKey = key as keyof typeof CategoryNames;
                        if (categoryKey === "CATS") return;
                        return (
                          <option
                            className="font-poppins"
                            key={key}
                            value={categoryKey}
                          >
                            {CategoryNames[categoryKey]}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                      Daudzums (gab.)
                    </label>
                    <FormInput
                      placeholder="Ievadiet produkta daudzumu"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                    Augšupielādēt attēlu
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.files })
                    }
                    type="file"
                    accept="image/*"
                    multiple
                    className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm "
                  />
                  <p className="text-sm opacity-40">
                    Bildes izmērs nedrīkst pārsniegt 4MB.
                  </p>
                </div>
                <p className="text-sm opacity-40">
                  Esošās bildes ({formData?.images?.images?.length ?? 0})
                </p>
                <div className="grid grid-cols-4 place-items-center">
                  {formData?.images?.images &&
                    formData.images.images.map((image: any) => (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={(e) => {
                            deleteImage(e, image.url);
                          }}
                          className="hover:opacity-80"
                        >
                          <i className="fa-solid fa-trash text-red-500"></i>
                        </button>
                        <img
                          key={image.id}
                          src={Constants.BASE_URL + image.url}
                          alt={formData.display_name}
                          className="w-24 h-auto rounded-md shadow-md"
                        />
                      </div>
                    ))}
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
