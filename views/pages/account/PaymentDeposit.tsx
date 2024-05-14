import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import PaymentAddcard from "./PaymentAddcard";
import PaymentAddbank from "./PaymentAddbank";

const PaymentWithdraw = ({ userData }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedCardNumber, setSelectedCardNumber] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(0);
  const [showAddCard, setShowAddCard] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    setSelectedCardNumber(""); // Reset selected card number when payment method changes
  };

  const handleCardNumberChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Add Your Card") {
      setShowAddCard(true);
    } else {
      setSelectedCardNumber(selectedValue);
    }
  };

  const stepNames = ["Details", "Confirmation", "Success"];

  const nextStep = () => {
    if (currentStep < stepNames.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    const success = false;

    if (success) {
      toast.success("Submitted");
    } else {
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleAddCardClick = () => {
    setShowAddCard(true);
  };
  const progressWidth = `${(currentStep / (stepNames.length - 1)) * 100}%`;

  return (
    <div className="mt-3 w-50 mx-auto">
      {/* Progress bar */}
      <div className="progress-container mx-auto">
        <div className="progress-container   w-100  mx-auto">
          <ul
            className="progressbar list-unstyled d-flex justify-content-between"
            style={{ padding: 0 }}
          >
            {stepNames.map((label, index) => (
              <li
                key={index}
                className={`step ${
                  index === currentStep
                    ? "active d-flex flex-column align-items-center"
                    : index < currentStep
                    ? "done d-flex flex-column align-items-center"
                    : "d-flex flex-column align-items-center"
                }`}
                style={{
                  width: "33.33%",
                  position: "relative",
                  fontSize: "18px",
                }}
              >
                <div
                  className="circle-indicator rounded-circle border"
                  style={{
                    width: "40px",
                    height: "40px",
                    lineHeight: "30px",
                    textAlign: "center",
                    backgroundColor:
                      index === currentStep ? "Black" : "#fff",
                    color: index === currentStep ? "#fff" : "#5bc0de",
                    border: "2px solid #5bc0de",
                    borderRadius: "50%",
                    marginBottom: "10px",
                    zIndex: 2,
                    animation:
                      index === currentStep ? "pulse 1.5s infinite" : "none",
                  }}
                >
                  {index + 1}
                </div>
                <div className="step-name">{label}</div>
              </li>
            ))}
          </ul>
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: progressWidth }}
            ></div>
          </div>
        </div>
      </div>

      {/* Deposit money form */}
      <div className="text-center mt-4 mb-4">
        <h2 className="fw-400">Deposit Money</h2>
      </div>
      <div className="bg-white shadow-lg rounded-md p-3 mb-3">
        <form id="form-withdraw-money" method="post">
          {/* Payment method selection */}
          <div className="mb-3">
            <label htmlFor="withdrawTo" className="form-label fw-bold">
              Withdraw to
            </label>
            {/* Your amount input JSX */}
          </div>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Payment Method</Form.Label>
            <Form.Control
              as="select"
              required
              className="rounded"
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="">Select Payment Method</option>
              <option value="Visa Card">Visa Card</option>
              <option value="Master Card">Master Card</option>
              <option value="Bank Card">Bank Card</option>
            </Form.Control>
          </Form.Group>

          {/* Card selection */}
          {selectedPaymentMethod && (
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                {selectedPaymentMethod} Card Numbers
              </Form.Label>
              <Form.Control
                as="select"
                className="rounded"
                value={selectedCardNumber}
                onChange={handleCardNumberChange}
              >
                <option value="">Select Card Number</option>
                {/* Visa Card options */}
                {selectedPaymentMethod === "Visa Card" && (
                  <>
                    <option value="XXXX-XXXX-XXXX-2468">
                      XXXX-XXXX-XXXX-2468
                    </option>
                    <option value="XXXX-XXXX-XXXX-2468">
                      XXXX-XXXX-XXXX-2468
                    </option>
                    <option value="XXXX-XXXX-XXXX-2468">
                      XXXX-XXXX-XXXX-2468
                    </option>
                    <option>Add Your Card</option>
                  </>
                )}
                {/* Master Card options */}
                {selectedPaymentMethod === "Master Card" && (
                  <>
                    <option value="XXXX-XXXX-XXXX-2468">
                      XXXX-XXXX-XXXX-2468
                    </option>
                    <option value="XXXX-XXXX-XXXX-2468">
                      XXXX-XXXX-XXXX-2468
                    </option>
                    <option value="XXXX-XXXX-XXXX-2468">
                      XXXX-XXXX-XXXX-2468
                    </option>
                    <option>Add Your Card</option>
                  </>
                )}
                {/* Bank Card options */}
                {selectedPaymentMethod === "Bank Card" && (
                  <>
                    <option value="XXXX-XXXX-XXXX-7890">
                      XXXX-XXXX-XXXX-7890
                    </option>
                    <option value="XXXX-XXXX-XXXX-2468">
                      XXXX-XXXX-XXXX-2468
                    </option>
                    <option>Add Your Card</option>
                    
                  </>
                )}
              </Form.Control>
            </Form.Group>
          )}

          {/* Transaction fees */}
          <p className="text-muted mt-4">
            Transaction fees
            <span className="float-end d-flex align-items-center">
              <del>1.00 USD</del>
              <span className="badge bg-info text-1 text-white fw-bold ms-2">
                Free
              </span>
            </span>
          </p>

          {/* Deposit summary */}
          <hr />
          <p className="deposit-summary text-4 fw-bold">
            You'll deposit <span className="float-end">1,000.00 USD</span>
          </p>

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-3">
            {/* Previous button */}
            {currentStep > 0 && currentStep < stepNames.length - 1 && (
              <button
                className="btn btn-outline-primary rounded"
                type="button"
                onClick={prevStep}
              >
                Previous
              </button>
            )}

            {/* Continue button */}
            {currentStep < stepNames.length - 1 && (
              <button
                className="btn btn-outline-primary rounded"
                type="button"
                onClick={nextStep}
              >
                Continue
              </button>
            )}

            {/* Submit button */}
            {currentStep === stepNames.length - 1 && (
              <button
                className="btn btn-primary rounded"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}

            {/* Render PaymentAddcard when showAddCard is true */}
            {showAddCard && selectedPaymentMethod === "Visa Card" && (
              <PaymentAddcard
                onClose={() => setShowAddCard(false)}
                showCard={false}
              />
            )}

            {/* Render PaymentAddbank when showAddCard is true */}
            {showAddCard && selectedPaymentMethod === "Bank Card" && (
              <PaymentAddbank
                onClose={() => setShowAddCard(false)}
                showCard={false}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentWithdraw;
