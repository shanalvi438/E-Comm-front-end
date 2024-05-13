import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, Card } from "reactstrap";

const PaymentAddcard = ({ onClose, showCard }) => {
  // Initialize the newCardModal state using a function to calculate the initial value
  const [newCardModal, setNewCardModal] = useState(() => {
    // Calculate the initial value based on the showCard prop
    return showCard !== true ? showCard : false; // Default to true if showCard is undefined or false
  });

  // Update newCardModal when the showCard prop changes
  useEffect(() => {
    setNewCardModal(showCard !== false ? showCard : true);
  }, [showCard]);

  // Function to handle toggling the modal state
  const handleToggleModal = () => {
    setNewCardModal(!newCardModal); // Toggle the modal state
    if (typeof onClose === "function") {
      onClose(); // Call the onClose function passed from the parent component
    }
  };

  return (
    <>
      {showCard !== false && (
         <Card
         className="col-12 col-md-12 col-lg-6 bg-gray rounded shadow-sm d-flex  w-100 h-100"
         style={{
           background: "linear-gradient(to right, #F2F2F2, #CCCCCC)",
         }}
       >
         <p className="w-100 text-center lh-base mt-5 mb-5">
           <button
             className="text-3 border border-none"
             onClick={handleToggleModal}
           >
             <i className="fas fa-plus-circle"></i>
           </button>
           <span className="d-block text-body text-3">Add New Card</span>
         </p>
       </Card>
      )}

      <Modal isOpen={newCardModal} toggle={handleToggleModal}>
        <ModalHeader toggle={handleToggleModal}>
          {/* Add text or components for the modal header */}
        </ModalHeader>
        <ModalBody>
          {/* Additional modal content */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-400">Add bank account</h5>
            </div>
            <div className="modal-body p-4">
              <form id="addbankaccount" method="post">
                <div className="mb-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      id="personal"
                      name="bankAccountType"
                      type="radio"
                    />
                    <label className="form-check-label" htmlFor="personal">
                      Personal
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      id="business"
                      name="bankAccountType"
                      type="radio"
                    />
                    <label className="form-check-label" htmlFor="business">
                      Business
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputCountry" className="form-label">
                    Bank Country
                  </label>
                  <select
                    className="form-select"
                    id="inputCountry"
                    name="country_id"
                  >
                    <option value=""> --- Please Select --- </option>
                    <option value="244">Aaland Islands</option>
                    <option value="1">Afghanistan</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="bankName" className="form-label">
                    Bank Name
                  </label>
                  <select className="form-select" id="bankName" name="bankName">
                    <option value=""> Please Select </option>
                    <option value="1">Bank Name 1</option>
                    <option value="2">Bank Name 2</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="accountName" className="form-label">
                    Account Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    data-bv-field="accountName"
                    id="accountName"
                    placeholder="e.g. Smith Rhodes"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="accountNumber" className="form-label">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    data-bv-field="accountNumber"
                    id="accountNumber"
                    placeholder="e.g. 12346678900001"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ifscCode" className="form-label">
                    NEFT IFSC Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    data-bv-field="ifscCode"
                    id="ifscCode"
                    placeholder="e.g. ABCDE12345"
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    id="remember-me"
                    name="remember"
                    type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="remember-me">
                    I confirm the bank account details above
                  </label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                    Add Bank Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PaymentAddcard;
