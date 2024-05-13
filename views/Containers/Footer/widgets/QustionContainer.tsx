import Link from "next/link";
import React, { useEffect, useState } from "react";

interface qustionContainerProps {
  faqsData: any;
}

const QustionContainer: React.FC<qustionContainerProps> = ({ faqsData }) => {
  return (
    <>
      <div className="footer-box mb-5">
        <div className="footer-title">
          <h5 className="mb-3">{faqsData.name}</h5>
        </div>
        <div className="footer-content">
          <ul className="list-unstyled">
            {faqsData.faqs.map((q) => {
              return (
                <li className="mb-1" key={q.id}>
                  <Link href={`/FAQS/${faqsData.id}`}>
                    <a className="footer-link text-secondary">{q.question}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default QustionContainer;
