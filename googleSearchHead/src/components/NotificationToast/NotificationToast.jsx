import useToast from "../../Hooks/useToast";

function NotificationToast() {
  const notification = useToast(); 

  return (
    <button onClick={() => notification({
      message: 'Notified Succesfully',
      type: 'success',
      duration: 4,
    })}>Send Notification</button>
  )
}

export default NotificationToast