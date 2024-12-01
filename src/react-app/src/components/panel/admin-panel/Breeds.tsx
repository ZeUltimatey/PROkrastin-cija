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

export const Breed = {
  id: 0,
  display_name: "",
  feeding_info: "",
  personality_info: "",
  environment_info: "",
  tips_info: "",
  image_url: null as any,
  images: { images: [] as { id: number; url: string }[] },
};

export const Breeds = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(Breed);
  const [breeds, setBreeds] = useState<(typeof Breed)[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const showToast = useToast();

  const confirm = useConfirmation();

  const fetchProducts = async (link?: string) => {
    await fetch(link ?? `${Constants.API_URL}/breeds`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setBreeds(data.data);
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
    await fetch(`${Constants.API_URL}/breeds/${id}`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setFormData(data.data[0]);
        setIsModalOpen(true);
      }
    });
  };

  const onProductDelete = async (id: number) => {
    if (await confirm("Dzēst šķirni?")) {
      await fetch(`${Constants.API_URL}/breeds/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      }).then((response) => {
        if (response.ok) {
          showToast(true, "Šķirne veiksmīgi dzēsta!");
          setTimeout(() => window.location.reload(), 1000);
        } else {
          showToast(false, "Kļūda dzēšot šķirni.");
        }
      });
    }
    return;
  };

  const onProductView = (id: number) => {
    fetch(`${Constants.API_URL}/breeds/${id}`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setFormData(data.data[0]);
        setIsPreviewOpen(true);
      }
    });
  };

  const columnHelper = createColumnHelper<typeof Breed>();

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
            href={`/breed/${info.row.original.id}`}
            className="hover:underline"
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.display({
        header: "Darbības",
        cell: (info) => (
          <div className="flex gap-2 place-items-center justify-center">
            <button onClick={() => onProductView(info.row.original.id)}>
              <i className="fa-eye fa-solid"></i>
            </button>
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
    await fetch(`${Constants.API_URL}/breeds`, {
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
        if (formData.image_url) {
          await handlePictureAdd(data);
        }
        showToast(true, "Šķirne veiksmīgi pievienota!");
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda šķirnes izveidē.");
      }
    });
    setIsLoading(false);
  };

  // const handlePictureAdd = async () => {
  //   const imageData = new FormData();
  //   Array.from(formData.image_url).forEach((image: any, index: number) => {
  //     imageData.append(`images[${index}]`, image);
  //   });
  //   console.log(formData.image_url);
  //   await fetch(
  //     `${Constants.API_URL}/products/${
  //       formData.id == 0 ? products.length + 1 : formData.id
  //     }/images/add`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem(
  //           Constants.LOCAL_STORAGE.TOKEN
  //         )}`,
  //       },
  //       body: imageData,
  //     }
  //   ).then(async (response) => {
  //     if (response.ok) {
  //       showToast(true, "Profila bilde pievienota.");
  //       setTimeout(() => window.location.reload(), 1000);
  //     } else {
  //       showToast(false, "Kļūda profila bildes pievienošanā.");
  //     }
  //   });
  // };

  const onEditSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsEditing(false);
    setIsLoading(true);

    await fetch(`${Constants.API_URL}/breeds/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(formData),
    }).then(async (response) => {
      if (formData.image_url) {
        await handlePictureAdd(formData.id);
      }
      if (response.ok) {
        showToast(true, "Šķirne veiksmīgi atjaunināta!");
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda šķirnes atjaunināšanā.");
      }
    });
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setIsPreviewOpen(false);
    setFormData(Breed);
  };

  const table = useReactTable({
    columns,
    data: breeds,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });

  const deleteImage = async (
    e: { preventDefault: () => void },
    url: string
  ) => {
    e.preventDefault();
    if (await confirm("Dzēst bildi?")) {
      fetch(`${Constants.API_URL}/breeds/${formData.id}/images/remove/${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      }).then((response) => {
        if (response.ok) {
          showToast(true, "Bilde veiksmīgi dzēsta!");
          setTimeout(() => window.location.reload(), 1000);
        }
      });
    }
  };

  const handlePictureAdd = async (id: number) => {
    const imageData = new FormData();
    Array.from(formData.image_url).forEach((image: any, index: number) => {
      imageData.append(`images[${index}]`, image);
    });
    console.log(formData.image_url);
    await fetch(`${Constants.API_URL}/breeds/${id}/images/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: imageData,
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 bg-content-white">
        <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-brown font-poppins">
              Šķirnu saraksts
            </h1>
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-medium-brown text-white px-4 me-4 min-w-48 hover:bg-opacity-85 transition-all py-2 rounded-lg font-poppins"
              >
                <i className="fa-solid fa-plus" /> Pievienot šķirni
              </button>
            </div>
          </div>
        </header>
        <div className="flex place-items-center justify-center flex-col gap-4">
          {breeds && (
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
            <Pagination pagination={pagination} onNavigate={fetchProducts} />
          )}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="bg-white p-8 rounded-lg h-5/6 shadow-lg w-1/3 relative overflow-auto ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                  Jaunas šķirnes pievienošana
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
                    Šķirnes nosaukums
                  </label>
                  <FormInput
                    placeholder="Ievadiet šķirnes nosaukumu"
                    value={formData.display_name}
                    onChange={(e) =>
                      setFormData({ ...formData, display_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                    Barošana
                  </label>
                  <textarea
                    className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                    rows={3}
                    placeholder="Ievadiet informāciju par barošanu"
                    value={formData.feeding_info}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        feeding_info: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                    Temperaments
                  </label>
                  <textarea
                    className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                    rows={3}
                    placeholder="Ievadiet informāciju par temperamentu"
                    value={formData.personality_info}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personality_info: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                    Vide
                  </label>
                  <textarea
                    className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                    rows={3}
                    placeholder="Ievadiet informāciju par vidi"
                    value={formData.environment_info}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        environment_info: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                    Padomi
                  </label>
                  <textarea
                    className="mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                    rows={3}
                    placeholder="Ievadiet informāciju par padomiem"
                    value={formData.tips_info}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tips_info: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                    Augšupielādēt attēlus
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
                            deleteImage(e, image.id);
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
        {isPreviewOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full w-full relative overflow-auto ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                  Šķirnes informācijas priekšskats
                </h2>
                <button
                  onClick={closeModal}
                  className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-4">
                  {formData?.images?.images &&
                    formData.images.images.map((image: any) => (
                      <img
                        key={image.id}
                        src={Constants.BASE_URL + image.url}
                        alt={formData.display_name}
                        className="w-48 h-auto rounded-md shadow-md"
                      />
                    ))}
                </div>
                <div className="flex flex-col grow gap-8 font-poppins">
                  <div className="bg-light-gray p-6 rounded-md shadow-lg">
                    <h3 className="lg:text-2xl text-lg font-semibold text-accent-brown mb-4">
                      Barošana
                    </h3>
                    <p className="text-dark-brown lg:text-lg">
                      {formData.feeding_info}
                    </p>
                  </div>

                  <div className="bg-light-gray p-6 rounded-md shadow-lg">
                    <h3 className="lg:text-2xl text-lg font-semibold text-accent-brown mb-4">
                      Personība
                    </h3>
                    <p className="text-dark-brown lg:text-lg">
                      {formData.personality_info}
                    </p>
                  </div>

                  <div className="bg-light-gray p-6 rounded-md shadow-lg">
                    <h3 className="lg:text-2xl text-lg font-semibold text-accent-brown mb-4">
                      Dzīves apstākļi
                    </h3>
                    <p className="text-dark-brown lg:text-lg">
                      {formData.environment_info}
                    </p>
                  </div>

                  <div className="bg-light-gray p-6 rounded-md shadow-lg">
                    <h3 className="lg:text-2xl text-lg font-semibold text-accent-brown mb-4">
                      Noderīgi padomi
                    </h3>
                    <p className="text-dark-brown lg:text-lg">
                      {formData.tips_info}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
