import { ProfileInfo } from "./profile-page/ProfileInfo";
import { OrderHistory } from "./profile-page/OrderHistory";
import { SavedAddresses } from "./profile-page/SavedAddresses";
import { PaymentMethods } from "./profile-page/PaymentMethods";
import { ProfileSettings } from "./profile-page/ProfileSettings";
import { useEffect, useState } from "react";
import { User } from "../universal/interfaces/User";
import { Constants } from "../universal/Constants";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState<User>(null);

  const navigate = useNavigate();

  const getUser = async () => {
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
        return;
      }
      navigate("/auth/login"); //TODO: handle this shit
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-content-white bg-opacity-95 p-6">
      {user && (
        <div className="container mx-auto lg:px-32">
          <ProfileInfo user={user} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <OrderHistory />
            <SavedAddresses />
            <PaymentMethods />
            <ProfileSettings user={user} />
          </div>
        </div>
      )}
    </div>
  );
};
