import React from "react";

const ErrorModal = ({ isOpen, onClose, message }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal-box">
            <img
              src="/catconfuse.gif"
              alt="errorcatnyan"
              className="h-24 object-cover mx-auto"
            />
            <p className="font-mono text-center mt-4">{message}</p>
            <div className="modal-action">
              <button className="btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
