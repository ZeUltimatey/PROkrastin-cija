import { Constants } from "../../universal/Constants";

export const EmailConfirmation = () => {
  const token = localStorage.getItem(Constants.LOCAL_STORAGE.TOKEN);
  return (
    <div className="relative flex flex-col font-poppins text-center bg-white rounded-lg shadow-lg p-6 w-full max-w-md md:max-w-xl space-y-4 mt-10 md:mt-4 lg:mt-2">
      {token && <div className="">Paldies par e-pasta apstiprināšanu!</div>}
      {!token && (
        <div className="">
          Paldies par e-pasta apstiprināšanu!
          <br /> Lūdzu, ienāc šeit: <br />
          <button
            onClick={() => {
              window.location.assign("/auth/login");
            }}
            className="px-4 py-2 bg-light-brown rounded-md mt-4 hover:bg-opacity-85"
          >
            Ienākt
          </button>
        </div>
      )}
    </div>
  );
};
