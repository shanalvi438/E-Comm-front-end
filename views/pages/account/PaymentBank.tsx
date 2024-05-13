import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";

const PaymentBank = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const openModal = () => {
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <>
      <Card
        className="col-12 col-md-6 position-relative w-100 h-100 shadow-sm"
        style={{
          background: "linear-gradient(to right, #0272BC, #000000)",
        }}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onClick={openModal}
      >
        <div className="account-card account-card-primary text-white rounded">
          <div className="row g-0">
            <div className="col-3 d-flex justify-content-center p-3">
              <div className="my-auto text-center">
                <span className="text-lg" style={{ fontSize: "40px" }}>
                  <i className="fas fa-university"></i>
                </span>

                <p className="badge bg-warning text-dark text-0 fw-500 rounded-pill px-2 mb-0">
                  Primary
                </p>
              </div>
            </div>
            <div className="col-9 border-start">
              <div className="py-4 my-2 ps-4 text-white">
                <p className="text-3  mb-1 " style={{ fontSize: "18px" }}>
                  MY Bank
                </p>
                <p
                  className="text-3 opacity-9 mb-1"
                  style={{ fontSize: "18px" }}
                >
                  XXXXXXXXXXXX-9025
                </p>
                <p className="m-0">
                  Approved
                  <span className="text-3">
                    <i className="fas fa-check-circle"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {isMouseOver && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-20 rounded"
            style={{ zIndex: 1 }}
          >
            <div className="account-card-overlay rounded text-center d-flex align-items-center justify-content-center">
              <a href="#" className="text-info btn-link my-5 fw-bold">
                <span className="me-1">
                  <i className="fas fa-share"></i>
                </span>
                More Details
              </a>
              <a href="#" className="text-danger btn-link mx-2 fw-bold">
                <span className="me-1">
                  <i className="fas fa-minus-circle"></i>
                </span>
                Delete
              </a>
            </div>
          </div>
        )}
      </Card>
      ;
      <Modal show={showDetailsModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bank Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content">
            <div className="modal-body">
              <div className="row g-0">
                <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-start py-4">
                  <div className="my-auto text-center">
                    <div
                      className="text-lg text-white mb-3"
                      style={{ fontSize: "20px" }}
                    >
                      <i className="fas fa-university"></i>
                    </div>
                    <h3 className="text-3 text-white my-3">MY Bank</h3>
                    <div className="text-3 text-white my-4">XXX-9027 | US</div>
                    <p className="badge bg-light text-dark text-0 fw-500 rounded-pill px-2 mb-0">
                      Primary
                    </p>
                  </div>
                </div>
                <div className="col-sm-7">
                  <h5 className="text-5 fw-400 m-3">Bank Account Details</h5>
                  <hr />
                  <div className="px-3 mb-3">
                    <ul className="list-unstyled">
                      <li className="fw-500">Account Type:</li>
                      <li className="text-muted">Personal</li>
                    </ul>
                    <ul className="list-unstyled">
                      <li className="fw-500">Account Name:</li>
                      <li className="text-muted">Smith Rhodes</li>
                    </ul>
                    <ul className="list-unstyled">
                      <li className="fw-500">Account Number:</li>
                      <li className="text-muted">XXXXXXXXXXXX-9025</li>
                    </ul>
                    <ul className="list-unstyled">
                      <li className="fw-500">Bank Country:</li>
                      <li className="text-muted">Pakistan</li>
                    </ul>
                    <ul className="list-unstyled">
                      <li className="fw-500">Status:</li>
                      <li className="text-muted">
                        Approved
                        <span className="text-success text-3">
                          <i className="fas fa-check-circle"></i>
                        </span>
                      </li>
                    </ul>
                    <div className="d-grid mt-3">
                      <a href="#" className="btn btn-sm btn-danger shadow-none">
                        <span className="me-1">
                          <i className="fas fa-minus-circle"></i>
                        </span>
                        Delete Account
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentBank;
