import { useNavigate } from "react-router-dom";
import { IQuery } from "../../universal/IQuery";
import { Constants } from "../../universal/Constants";
import { CategoryNames } from "../../universal/CategoryNames";

export const Button = ({ isInfoButton }: { isInfoButton: boolean }) => {
  const navigate = useNavigate();

  const productsCatFilter = () => {
    const query = {
      product_type: CategoryNames.CATS,
    };

    localStorage.setItem(Constants.LOCAL_STORAGE.QUERY, JSON.stringify(query));
    navigate("/products");
  };

  if (!isInfoButton) {
    return (
      <button
        onClick={productsCatFilter}
        className="bg-accent-brown text-dark-brown min-w-64 justify-center hover:gap-4 hover:brightness-90 text-lg transition-all hover:shadow-xl rounded-full px-8 py-3.5 flex gap-2 place-items-center shadow-md"
      >
        <span className="font-semibold font-poppins">Skatīt kaķus</span>
        <i className="fa-solid fa-angles-right"></i>
      </button>
    );
  } else {
    return (
      <button
        onClick={() => navigate("/breeds")}
        className="bg-content-white hover:brightness-90 text-dark-brown justify-center min-w-64 hover:gap-4 transition-all hover:shadow-xl text-lg rounded-full px-8 py-3.5 flex gap-2 place-items-center shadow-md"
      >
        <span className="font-semibold font-poppins">Uzzināt vairāk</span>
        <i className="fa-solid fa-circle-info"></i>
      </button>
    );
  }
};
