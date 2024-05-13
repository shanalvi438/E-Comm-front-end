import React, { useState } from "react";

interface FaqContainerProps {
  selectedFaq: {
    faqs: any[];
  };
}

const FaqContainer: React.FC<FaqContainerProps> = ({ selectedFaq }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="faq-section">
      <div className="faq-title">
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="faq-content mt-2 bg-light p-2">
        <div className="row">
          <div className="col-md-3 p-3">
            <div className="accordion" id="accordionExample">
              {selectedFaq.faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`accordion-item ${faq.question === selectedQuestion ? "active" : ""}`}
                >
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button"
                      type="button"
                      onClick={() => handleQuestionClick(faq.question)}
                      style={{ backgroundColor: "transparent" }}
                    >
                      {index + 1}. {faq.question}
                    </button>
                  </h2>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-9">
            <div className="faq-answer p-4">
              {selectedQuestion && (
                selectedFaq.faqs
                  .filter((faq) => faq.question === selectedQuestion)
                  .map((faq) => (
                    <div key={faq.id}>
                      <h3>{faq.question}</h3>
                      <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqContainer;
