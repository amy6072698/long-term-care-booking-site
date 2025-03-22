import { toast, Zoom } from "react-toastify";

const showErrorMessage = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
    });
};

export default showErrorMessage;