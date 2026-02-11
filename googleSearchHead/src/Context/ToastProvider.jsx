import { createContext, useCallback, useMemo, useState } from "react";
import ToastList from "./ToastList";

export const ToastContext = createContext(null);

function ToastProvider({ children }) {

  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({message, type='info', duration=4}) => {
    const id = Date.now();
    setToasts((prev) => [...prev, {id, message, type, duration}])
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(() => ({
    addToast,
    removeToast,
  }), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastList
        toasts={toasts}
      />
    </ToastContext.Provider>
  )
}

export default ToastProvider;