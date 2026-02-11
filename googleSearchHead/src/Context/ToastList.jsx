import Toast from "./Toast";

function ToastList({ toasts }) {
  
  return (
    <div className="taost-container">
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