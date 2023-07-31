import React from "react";

const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal && (
        <div
          class="modal fade show"
          tabindex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div class="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
        // <div
        //   className="modal fade show"
        //   tabIndex="-1"
        //   role="dialog"
        //   style={{ display: "block" }}
        // >
        //   <div className="modal-dialog " role="document">
        //     <div className="modal-content">
        //       <div className="modal-header">
        //         <h5 className="modal-title">Data tidak ditemukan!</h5>
        //         <button
        //           type="button"
        //           className="close"
        //           data-dismiss="modal"
        //           onClick={() => setShowModal(false)}
        //         >
        //           <span>&times;</span>
        //         </button>
        //       </div>
        //       <div className="modal-body">
        //         <p>Pastikan Anda memasukkan lokasi yang benar.</p>
        //       </div>
        //       <div className="modal-footer">
        //         <button
        //           type="button"
        //           className="btn btn-primary"
        //           onClick={() => setShowModal(false)}
        //         >
        //           Tutup
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default Modal;
