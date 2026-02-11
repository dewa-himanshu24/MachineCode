import { useContext } from "react";
import { ToastContext } from "../Context/ToastProvider";

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be use within a ToastProvider');
  } 

  return context.addToast;
}

export default useToast;