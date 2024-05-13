import React, { useState } from "react";
import { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTruck } from "@fortawesome/free-solid-svg-icons"; // Import the required icons

const Tracking: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(-1); // Change initial step to -1

  const stepNames = [
    "In Process",
    "Packing",
    "Confirmed",
    "Out of Delivery",
    "Delivered",
    "Failed to deliver",
  ];

  const progressWidth = `${(currentStep / (stepNames.length - 1)) * 100}%`;

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

  // Array of icons
  const iconList = [faTruck, faTruck, faTruck, faTruck, faTruck, faTruck];

  // Additional data for each step
  const stepAdditionalData = [
    <div className="in-process">
      <span style={{ whiteSpace: "nowrap" }}>Wed, Jun 29, 2022 | 7:00 pm</span>
    </div>,
    <div className="packing">
      <span style={{ whiteSpace: "nowrap" }}>Wed, Jun 29, 2022 | 7:00 pm</span>
    </div>,
    <div className="confirmed">
      <span style={{ whiteSpace: "nowrap" }}>Wed, Jun 29, 2022 | 7:00 pm</span>
    </div>,
    <div className="out-of-delivery">
      <span style={{ whiteSpace: "nowrap" }}>Wed, Jun 29, 2022 | 7:00 pm</span>
    </div>,
    <div className="delivered">
      <span style={{ whiteSpace: "nowrap" }}>Wed, Jun 29, 2022 | 7:00 pm</span>{" "}
    </div>,
    <div className="failed-to-deliver">
      <span style={{ whiteSpace: "nowrap" }}>Wed, Jun 29, 2022 | 7:00 pm</span>
    </div>,
  ];

  return (
    <>
      <style>{`
        /* Pulse animation */
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 var(--theme-color1);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px var(--theme-color2); /* Using theme color */
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 var(--theme-color);
          }
        }
      `}</style>
      <section className="section-big-py-space  bg-light mb-3  ">
        <div className="custom-container">
          {/* StepsProgressBar */}
          <div className="progress-container w-100 ">
            <ul
              className="progressbar list-unstyled d-flex justify-content-between "
              style={{ padding: 0, position: "relative" }}
            >
              {stepNames.map((_, index) => (
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
                    width: `${100 / stepNames.length - stepNames.length}%`,
                    position: "relative",
                    fontSize: "15px",
                  }}
                >
                  <div
                    className={`circle-indicator rounded-circle border ${
                      index === currentStep ? "circle-active" : ""
                    }`}
                    style={{
                      width: "100px",
                      height: "100px",
                      lineHeight: "100px",
                      textAlign: "center",
                      backgroundColor:
                        index === currentStep
                          ? "var(--theme-color1)"
                          : index < currentStep
                          ? "var(--theme-color1)"
                          : "#808080",
                      border: `2px solid ${
                        index === currentStep
                          ? "var(--theme-color1)"
                          : index < currentStep
                      }`,
                      color: "white",
                      borderRadius: "50%",
                      zIndex: 2,
                      animation:
                        index === currentStep ? "pulse 0.5s infinite" : "none",
                    }}
                  >
                    {iconList[index] && (
                      <FontAwesomeIcon icon={iconList[index]} />
                    )}
                  </div>
                  <div className="step-name mt-2">{stepNames[index]}</div>
                  <p>{stepAdditionalData[index]}</p>{" "}
                  {/* Additional data for the step */}
                </li>
              ))}
              <div
                className="progress"
                style={{
                  position: "absolute",
                  top: "50px",
                  left: "0",
                  width: "100%",
                }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: progressWidth,
                    position: "relative",
                    zIndex: 1,
                  }}
                ></div>
              </div>
            </ul>
          </div>
          {/* Buttons to control progress */}
          <div className="d-grid gap-2 mt-5 w-50">
            {currentStep > 0 && (
              <button
                className="btn btn-sm btn-outline-primary rounded"
                type="button"
                onClick={prevStep}
              >
                Previous
              </button>
            )}

            {currentStep < stepNames.length - 1 && (
              <button
                className="btn btn-outline-primary btn-sm rounded"
                type="button"
                onClick={nextStep}
              >
                Continue
              </button>
            )}
          </div>
          Tracking active !!
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Tracking;
