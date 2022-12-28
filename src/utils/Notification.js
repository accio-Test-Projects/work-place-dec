import { Store } from "react-notifications-component";

export const Notification = ({ message, type = null }) => {
  Store.addNotification({
    title: "Wonderful!",
    message: message,
    type: type || "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};
