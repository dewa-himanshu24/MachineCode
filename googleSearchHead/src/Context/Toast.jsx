import { useEffect, useContext, memo } from "react";
import { ToastContext } from "./ToastProvider";
import './Toast.css';

const Toast =  memo(({ id, message, type, duration }) => {
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      removeToast(id);
    }, duration * 1000)

    return () => {
      clearTimeout(timer);
    }
  }, [id, duration, removeToast]);

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button onClick={() => removeToast(id)}>X</button>
    </div>
  )
})

export default Toast;