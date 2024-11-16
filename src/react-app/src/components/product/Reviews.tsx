import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Constants } from "../universal/Constants";
import { IProduct } from "../universal/interfaces/IProduct";
import { StarRating } from "./product-details/StarRating";
import { useToast } from "../universal/Toast";
import { IUser } from "../universal/interfaces/IUser";
import { useConfirmation } from "../universal/Confirmation";

export interface IReview {
  id: number;
  rating: number;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  reviewer?: IUser;
}

export const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reviews, setReviews] = useState<IReview[]>(null);
  const [product, setProduct] = useState<IProduct>(null);
  const [user, setUser] = useState<IUser>(null);

  const showToast = useToast();

  const navigate = useNavigate();

  const handleRatingChange = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const toggleAnonymous = () => {
    setIsAnonymous((prev) => !prev);
  };

  const { productId } = useParams();

  const fetchUser = async () => {
    await fetch(`${Constants.API_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
      }
    });
  };

  const fetchProduct = async () => {
    await fetch(`${Constants.API_URL}/products/${productId}`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setProduct(data.data);
      }
    });
  };

  const fetchReviews = async () => {
    await fetch(`${Constants.API_URL}/reviews/${productId}`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setReviews(data.data);
      }
    });
  };

  const postReview = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (rating === 0 || comment.replace(" ", "") === "") {
      showToast(false, "Lūdzu, ievadiet komentāru un norādiet novērtējumu!");
      return;
    }

    if (comment.length < 10) {
      showToast(false, "Lūdzu, ievadiet saturīgu atsauksmi!");
      return;
    }

    await fetch(`${Constants.API_URL}/reviews/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify({
        rating,
        content: comment,
        is_anonymous: isAnonymous,
      }),
    }).then(async (response) => {
      if (response.ok) {
        fetchReviews();
      }
    });
  };

  const confirm = useConfirmation();

  const deleteReview = async (reviewId: number) => {
    if (await confirm("Dzēst atsauksmi?")) {
      await fetch(`${Constants.API_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      }).then(async (response) => {
        if (response.ok) {
          fetchReviews();
        }
      });
    }
  };

  useEffect(() => {
    fetchUser();
    fetchReviews();
    fetchProduct();
  }, []);

  return (
    <div className="bg-content-white py-4 font-poppins px-12 h-screen">
      <div className="absolute top-4 left-4 cursor-pointer"></div>

      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-6">
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-6 h-6"
            >
              <i className="fa-solid fa-arrow-left text-2xl text-dark-brown"></i>
            </button>
            <h3 className="text-3xl font-poppins mb-4 font-semibold">
              Atsauksmes
            </h3>
          </div>
          {product && (
            <div>
              <h2 className="text-2xl font-poppins text-dark-brown">
                {product.display_name}
              </h2>
              <StarRating stars={2} />
              <p className="text-dark-brown text-xs ml-1">
                {reviews.length} atsauksmes
              </p>
              <p className="text-dark-brown mt-2">{product.description}</p>
            </div>
          )}
        </div>
        <img
          src={"../images/products/cat_food.png"}
          className="rounded-md h-56 w-56 object-cover shadow-md"
        />
      </div>

      <div className="mb-6 w-full">
        {user &&
          reviews &&
          reviews.map((review: IReview) => (
            <div key={review.id} className="mb-4 w-full">
              <div className="flex items-center gap-4 w-full">
                <img
                  src={`${
                    review.reviewer.image_url
                      ? Constants.BASE_URL + review.reviewer.image_url
                      : "https://t3.ftcdn.net/jpg/01/79/88/20/360_F_179882080_Zga46fOuCNnZlF9o2IC6gYgHVQFDVKMv.jpg"
                  }`}
                  className="w-16 h-16 rounded-full"
                ></img>
                <div className="w-full me-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">
                        {review.is_anonymous
                          ? "Anonīms"
                          : review.reviewer.display_name}
                      </span>
                      <StarRating stars={review.rating} />
                    </div>
                    {(user.user_role === "Admin" ||
                      review.reviewer.id === user.id) && (
                      <button onClick={() => deleteReview(review.id)}>
                        <i className="fa-solid fa-trash text-red-500"></i>
                      </button>
                    )}
                  </div>
                  <p className="text-dark-brown mt-1">{review.content}</p>
                  <p className="mt-2 opacity-40 text-sm">
                    {review.created_at.slice(0, 10)}
                  </p>
                </div>
              </div>
              <hr className="my-4 border-t border-dark-brown" />
            </div>
          ))}
      </div>

      {user && !reviews?.find((review) => review.reviewer.id == user.id) && (
        <form onSubmit={postReview} className="flex flex-col gap-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tavs komentārs"
            rows={6}
            className="mt-1 w-full px-4 py-2 border font-poppins border-gray-300 rounded-md shadow-sm resize-none"
          ></textarea>

          <div className="flex items-center gap-2">
            <span>Novērtējums:</span>
            <div className="flex">
              {[...Array(5)].map((_, starIndex) => (
                <i
                  key={starIndex}
                  onClick={() => handleRatingChange(starIndex)}
                  className={`fa-solid fa-star text-2xl cursor-pointer drop-shadow-sm ${
                    starIndex < rating ? "text-amber-300" : "text-stone-400"
                  }`}
                ></i>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>Pievienot atsauksmi anonīmi:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={toggleAnonymous}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-dark-gray rounded-full peer dark:bg-dark-brown peer-checked:after:translate-x-full peer-checked:after:border-content-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-content-white after:border-dark-brown after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-light-brown"></div>
            </label>
          </div>

          <input
            type="submit"
            className="bg-light-brown hover:cursor-pointer transition-all text-white font-poppins py-2 rounded-md hover:bg-medium-brown"
            value="Pievienot atsauksmi"
          />
        </form>
      )}
    </div>
  );
};
