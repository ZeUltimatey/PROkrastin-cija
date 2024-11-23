import { createContext, useContext, useState, ReactNode } from "react";

type ToastContextType = (success: boolean, text: string) => void;

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{ success: boolean; text: string } | null>(
    null
  );

  const showToast: ToastContextType = (success: boolean, text: string) => {
    setToast({ success, text });

    // Automatically hide the toast after a few seconds
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };
  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div
          className={`fixed top-20 z-50 toast-slide right-0 px-6 bg-content-white border-b-4 ${
            toast.success ? "border-green-500" : "border-red-500"
          } shadow-md h-16 flex place-items-center justify-center gap-2`}
        >
          {toast.success ? (
            <i className="fa-solid fa-check text-lg"></i>
          ) : (
            <i className="fa-solid fa-circle-exclamation text-lg"></i>
          )}
          <span className="font-poppins text-lg text-brow">{toast.text}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};
