import {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
} from "react";

// Create a context for the confirmation dialog
const ConfirmationContext = createContext(undefined);

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [resolvePromise, setResolvePromise] = useState(null);

  // Function to open the confirmation dialog
  const confirm = useCallback((message: string) => {
    setMessage(message);
    setIsOpen(true);

    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
    });
  }, []);

  // Functions to handle user response
  const handleConfirm = () => {
    setIsOpen(false);
    if (resolvePromise) resolvePromise(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolvePromise) resolvePromise(false);
  };

  const ConfirmationDialog = () =>
    isOpen && (
      <div className="fixed flex place-items-center justify-center z-40 top-0 bg-black bg-opacity-50 w-screen overflow-hidden h-screen">
        <div className="min-w-96  rounded-sm  bg-content-white  font-poppins  shadow-md text-dark-brown ">
          <div className="flex place-items-center py-2 px-4 justify-between">
            <div className="flex place-items-center gap-2">
              <i className="fa-solid fa-circle-exclamation text-xl"></i>
              <h2 className="font-semibold text-dark-brown">Uzmanību!</h2>
            </div>
            <button onClick={handleCancel}>
              <i className="fa-xmark fa-solid text-xl"></i>
            </button>
          </div>
          <div className="pb-4 pt-4 px-16 gap-8 flex flex-col place-items-center justify-center">
            <p className="font-semibold text-xl">{message}</p>
            <div className="flex gap-8">
              <button
                className="px-6 py-1 w-36 bg-light-brown rounded-full hover:bg-hover-brown shadow-sm transition-all text-lg"
                onClick={handleConfirm}
              >
                Jā
              </button>
              <button
                className="px-6 py-1 border-4 w-36 shadow-sm  transition-all hover:bg-hover-brown bg-content-white border-light-brown rounded-full text-lg"
                onClick={handleCancel}
              >
                Nē
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      <ConfirmationDialog />
    </ConfirmationContext.Provider>
  );
};

// Custom hook to access the confirmation function
export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      "useConfirmation must be used within a ConfirmationProvider"
    );
  }
  return context.confirm;
};
