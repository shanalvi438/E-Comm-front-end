import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Card } from "reactstrap";

const PaymentVisaCard = () => {
  const [showButtons1, setShowButtons1] = useState(false); // Corrected state name
  const [newCardModal, setNewCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (card) => {
    setSelectedCard(card);
    setNewCardModal(true);
  };

  return (
    <>
      <Card
        className="col-12 col-md-6 col-lg-4 position-relative w-100 h-100 "
        onMouseEnter={() => setShowButtons1(true)}
        onMouseLeave={() => setShowButtons1(false)}
        onClick={() => openModal("XXXX-XXXX-XXXX-4151")}
        style={{ background: "linear-gradient(to right, #0272BC, #000000)" }}
      >
        <div
          className="account-card account-card-primary text-white rounded p-3"
          style={{
            opacity: 0.8,
            height: "100%", // Make sure the child div takes 100% height
          }}
        >
          <p className="text-5">XXXX-XXXX-XXXX-4151</p>
          <p className="d-flex align-items-center">
            <span
              className="account-card-expire text-uppercase d-inline-block opacity-7 me-2"
              style={{ color: "#fff", fontSize: "1.2rem" }}
            >
              Valid
              <br />
              thru
              <br />
            </span>
            <span className="text-5 opacity-9" style={{ color: "#fff" }}>
              07/24
            </span>
            <span className="badge bg-warning text-dark text-1 fw-500 rounded-pill px-2 ms-auto">
              Primary
            </span>
          </p>
          <p className="mt-2" style={{ fontSize: "1.5rem" }}>
            Name Here:
          </p>

          <p className="d-flex align-items-center m-0">
            <span
              className="text-uppercase fw-500"
              style={{ color: "#fff" }}
            ></span>
            <img
              className="ms-auto col-2 bg-white"
              src="/images/Visa.png"
              alt="visa"
              title=""
              style={{ maxWidth: "15%", borderRadius: "4px" }} // Added border-radius for styling
            />
          </p>
        </div>
        {showButtons1 && (
          <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black opacity-20 rounded p-3 d-flex justify-content-center align-items-center">
            <div>
              <button
                className="btn btn-warning me-2"
                onClick={() => openModal("XXXX-XXXX-XXXX-4151")}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => openModal("XXXX-XXXX-XXXX-4151")}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Card>

      <Modal
        isOpen={newCardModal}
        toggle={() => setNewCardModal(!newCardModal)}
      >
        <ModalHeader
          toggle={() => setNewCardModal(!newCardModal)}
        ></ModalHeader>
        <ModalBody>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-400">Update Card</h5>
            </div>
            <div className="modal-body p-4">
              <form id="updateCard" method="post">
                <div className="mb-3">
                  <label htmlFor="edircardNumber" className="form-label">
                    Card Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text ">
                      <img
                        className="ms-auto col-1"
                        // src="/images/MasterCard.png"
                        src="/images/Visa.png"
                        alt="visa"
                        title=""
                      />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      data-bv-field="edircardNumber"
                      id="edircardNumber"
                      disabled
                      placeholder="Card Number"
                    />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-lg-6">
                    <label htmlFor="editexpiryDate" className="form-label">
                      Expiry Date
                    </label>
                    <input
                      id="editexpiryDate"
                      type="text"
                      className="form-control"
                      data-bv-field="editexpiryDate"
                      required
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="editcvvNumber" className="form-label">
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
                      id="editcvvNumber"
                      type="password"
                      className="form-control"
                      data-bv-field="editcvvNumber"
                      required
                      // value="321"
                      placeholder="CVV (3 digits)"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="editcardHolderName" className="form-label">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    data-bv-field="editcardHolderName"
                    id="editcardHolderName"
                    required
                    placeholder="Card Holder Name"
                  />
                </div>
                <div className="d-grid mt-4">
                  <button className="btn btn-primary" type="submit">
                    Update Card
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

export default PaymentVisaCard;
