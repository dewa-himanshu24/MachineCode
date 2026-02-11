import Toast from "./Toast";
import './Toast.css';

function ToastList({ toasts }) {
  
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
        />
      ))}
    </div>
  )
};

export default ToastList;