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
          className="col-12 col-md-6 col-lg-4 bg-gray rounded shadow-sm w-100 h-100 "
          style={{
            background: "linear-gradient(to right, #F2F2F2, #CCCCCC)",
          }}
        >
          <p className="w-100 text-center mt-5 mb-5">
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
              <h5 className="modal-title fw-400">Add a Card</h5>
            </div>
            <div className="modal-body p-4">
              <form id="addCard" method="post">
                <div className="btn-group d-flex mb-3" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="options"
                    id="option1"
                    autoComplete="off"
                    checked
                  />
                  <label
                    className="btn btn-outline-secondary btn-sm shadow-none w-100"
                    htmlFor="option1"
                  >
                    Debit
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="options"
                    id="option2"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-secondary btn-sm shadow-none w-100"
                    htmlFor="option2"
                  >
                    Credit
                  </label>
                </div>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="cardType" className="form-label">
                      Card Type
                    </label>
                    <select id="cardType" className="form-select" required>
                      <option value="">Card Type</option>
                      <option>Visa</option>
                      <option>MasterCard</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="cardNumber" className="form-label">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      data-bv-field="cardnumber"
                      id="cardNumber"
                      required
                      // value=""
                      placeholder="Card Number"
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="expiryDate" className="form-label">
                      Expiry Date
                    </label>
                    <input
                      id="expiryDate"
                      type="text"
                      className="form-control"
                      data-bv-field="expiryDate"
                      required
                      // value=""
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="cvvNumber" className="form-label">
                      <span
                        className="text-info ms-1"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="For Visa/Mastercard, the three-digit CVV number is printed on the signature panel on the back of the card immediately after the card's account number. For American Express, the four-digit CVV number is printed on the front of the card above the card account number."
                        aria-label="For Visa/Mastercard, the three-digit CVV number is printed on the signature panel on the back of the card immediately after the card's account number. For American Express, the four-digit CVV number is printed on the front of the card above the card account number."
                      >
                        <i className="fas fa-question-circle"></i>
                      </span>
                    </label>
                    <input
                      id="cvvNumber"
                      type="password"
                      className="form-control"
                      data-bv-field="cvvnumber"
                      required
                      // value=""
                      placeholder="CVV (3 digits)"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="cardHolderName" className="form-label">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      data-bv-field="cardholdername"
                      id="cardHolderName"
                      required
                      // value=""
                      placeholder="Card Holder Name"
                    />
                  </div>
                  <div className="col-12 d-grid mt-4">
                    <button className="btn btn-primary" type="submit">
                      Add Card
                    </button>
                  </div>
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
