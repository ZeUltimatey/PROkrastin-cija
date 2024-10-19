import { ProfileInfo } from "./profile-page/ProfileInfo";
import { OrderHistory } from "./profile-page/OrderHistory";
import { SavedAddresses } from "./profile-page/SavedAddresses";
import { PaymentMethods } from "./profile-page/PaymentMethods";
import { ProfileSettings } from "./profile-page/ProfileSettings";

export const Profile = () => {
  return (
    <div className="min-h-screen bg-content-white bg-opacity-95 p-6">
      <div className="container mx-auto lg:px-32">
        <ProfileInfo />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <OrderHistory />
          <SavedAddresses />
          <PaymentMethods />
          <ProfileSettings />
        </div>
      </div>
    </div>
  );
};
