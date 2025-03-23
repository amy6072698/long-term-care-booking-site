import { toast, Zoom } from "react-toastify";

const showSuccessMessage = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
    style: { whiteSpace: "pre-line" },
  });
};

export default showSuccessMessage;