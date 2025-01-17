const Modal = ({ isOpen , onClose, onConfirm , title}) => {
    if (!isOpen) return null;
  // isOpen = true
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-[#f9f9f9] p-32 rounded-lg shadow-lg text-center">
          <h2 className=" font-semibold font-poppins mb-4 text-xl">Are you sure want to  {title} ?</h2>
          <div className="flex justify-center gap-7">
            <button
              className="bg-[#99775C] text-white  px-4 py-2 rounded hover:bg-blue-600"
              onClick={onConfirm}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };


  export default Modal;