import React from "react";
import { toast } from "react-toastify";
import { TOAST_TYPE, TOAST_POSITION } from "constants/global";
function MessageContent({ message, type }) {
    const icon = () => {
        switch (type) {
        case TOAST_TYPE.SUCCESS:
            return (<i className="fa-solid fa-circle-check mr-2" style={{ color: "#57ad23" }} />);
        case TOAST_TYPE.ERROR:
            return (<i className="fa-solid fa-circle-check mr-2" style={{ color: "#d45058" }} />);
        case TOAST_TYPE.INFO:
            return (<i className="fa-solid fa-circle-info mr-2" style={{ color: "#336bfe" }} />);
        case TOAST_TYPE.WARN:
            return (<i className="fa-solid fa-square-exclamation mr-2" style={{ color: "#f19d42" }} />);
        default:
            return null;
        }
    };

    const title = () => {
        switch (type) {
        case TOAST_TYPE.SUCCESS:
            return "Success";
        case TOAST_TYPE.ERROR:
            return "Error";
        case TOAST_TYPE.INFO:
            return "Information";
        case TOAST_TYPE.WARN:
            return "Alert";
        default:
            return "";
        }
    };

    return (
        <div className="toast-container">
            {icon()}
            <div className="content">
                <div>{title()}</div>
                <div>{message}</div>
            </div>
        </div>
    );
}

const useToast = () => (message, onclose = null, type = TOAST_TYPE.SUCCESS, position = TOAST_POSITION.TOP_RIGHT) => {
    const toastFunc = type ? toast[type] : toast;
    const options = {
        position,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onclose: typeof onclose === "function" ? onclose() : () => { },
        icon: false
    };
    if (type) toastFunc(<MessageContent message={message} type={type} />, options);
    if (!type) toastFunc(message, options);
};

export default useToast;
