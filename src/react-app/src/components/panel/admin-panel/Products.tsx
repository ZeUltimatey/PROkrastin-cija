import { useEffect, useState } from "react";
import { Sidebar } from "../admin-panel/Sidebar";
import { FormInput } from "../../universal/FormInput";
import { Constants } from "../../universal/Constants";
import { useToast } from "../../universal/Toast";
import { CategoryNames } from "../../universal/CategoryNames";
import { ProductTable } from "./table/ProductTable";

export const Product = {
  id: 0,
  display_name: "",
  description: "",
  pricing: 0,
  discount_pricing: null as number,
  product_type: "CATS",
  stock: 0,
  image_url: "",
};

export const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(Product);
  const [products, setProducts] = useState<(typeof Product)[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const showToast = useToast();

  const fetchProducts = async () => {
    await fetch(`${Constants.API_URL}/products`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data);
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
    await fetch(`${Constants.API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          Constants.SESSION_STORAGE.TOKEN
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
  };

  const onFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(
          Constants.SESSION_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        showToast(true, "Produkts veiksmīgi pievienots!");
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda produkta izveidē.");
      }
    });
    setIsLoading(false);
  };

  const onEditSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsEditing(false);
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/products/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(
          Constants.SESSION_STORAGE.TOKEN
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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-content-white p-8">
        <h2 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
          Preču Saraksts
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
        >
          <i className="fa-solid fa-plus"></i> Pievienot produktu
        </button>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-dark-brown font-poppins mb-4">
            Esošie Produkti
          </h3>
          <ProductTable
            products={products}
            onProductEdit={onProductEdit}
            onProductDelete={onProductDelete}
          />
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
