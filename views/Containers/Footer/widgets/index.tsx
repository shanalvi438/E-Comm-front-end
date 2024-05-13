import React, { useEffect, useState } from "react";
import { Row, Col, Container, Media, Button } from "reactstrap";
import axios from "axios";
import QustionContainer from "./QustionContainer";
import { useDispatch } from "react-redux";
import { setFaqs } from "store/product/reducers";
import Link from "next/link";

type FooterSectionProps = {
  layoutLogo: string;
};

const FooterSection: React.FC<FooterSectionProps> = ({ layoutLogo }) => {
  const [faqsData, setFaqDatas] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faqs`
        );
        dispatch(setFaqs(response.data));
        setFaqDatas(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="footer-2 mt-4">
      {faqsData && (
        <>
          <div className="custom-container">
            <Row className="row align-items-center">
              <div className="account-right">
                <div className="row">
                  {faqsData.map((faq, index) => (
                    <div key={index} className="col-lg-2 col-md-4 col-sm-12">
                      <QustionContainer faqsData={faq} />
                    </div>
                  ))}
                </div>
              </div>
            </Row>
          </div>
          {/* <Link href="/footer/contact-us-form-page">
            <a>
              <Button variant="primary" size="sm">
                Contact us
              </Button>
            </a>
          </Link>
          <Link href="/footer/emailformat">
            <a>
              <Button variant="primary" size="sm">
                Email Format
              </Button>
            </a>
          </Link>

          <Link href="/footer/openDispute">
            <a>
              <img src="/images/open-dispute-icon.png" alt="" />
            </a>
          </Link>
          <Link href="/invoice-page/">
            <Button className="btn btn-primary btn-sm"> INVOICE</Button>
          </Link> */}

          <Container>
            <Row className="row align-items-center d-flex justify-content-center">
              <Col lg="6" md="6" sm="6" xs="6">
                <div
                  className="footer-detail"
                  style={{ marginTop: "12px", gap: "20%" }}
                >
                  <ul className="list-inline d-flex justify-content-center">
                    <li className="list-inline-item mx-4">
                      <div className="footer-logo">
                        <Media
                          src={`/images/layout-2/logo/im-logo.png`}
                          width="150px"
                          className="img-fluid"
                          alt="logo"
                          style={{ marginLeft: "0%", gap: "20%" }}
                        />
                      </div>
                    </li>
                    <br />
                  </ul>
                </div>
              </Col>
              <Col lg="6" md="6" sm="6" xs="6">
                <div className="footer-detail d-flex align-items-center gap-2 col-5">
                  <Media
                    src="/images/MasterCard.png"
                    className="img-fluid col-6"
                    alt="Google Play"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                  <Media
                    src="/images/Visa.png"
                    className="img-fluid col-6"
                    alt="Google Play"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>

          <div className="app-link-block bg-transparent">
            <Container>
              <Row>
                <div className="app-link-bloc-contain app-link-bloc-contain-1">
                  <div className="app-item-group">
                    <div className="app-item">
                      <Media
                        src="/images/GooglePlay.png"
                        className="img-fluid"
                        alt="Google Play"
                        style={{
                          width: "150px",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="app-item">
                      <Media
                        src="/images/AppStore.png"
                        className="img-fluid"
                        alt="App Store"
                        style={{
                          width: "140px",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                  <div className="app-item-group ">
                    <div className="social-block">
                      <h5>&nbsp; &nbsp; Follow us</h5>
                      <ul className="social" style={{ fontSize: "18px" }}>
                        <li>
                          <i className="fa fa-facebook text-secondary"></i>
                        </li>
                        <br />
                        <li>
                          <i className="fa fa-twitter text-secondary"></i>
                        </li>
                        <br />
                        <li>
                          <i className="fa fa-instagram text-secondary"></i>
                        </li>
                        <br />
                      </ul>
                    </div>
                  </div>
                </div>
              </Row>
            </Container>
          </div>

          <div className="sub-footer">
            <Container>
              <Row>
                <Col xs="12">
                  <div className="">
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#777",
                        marginTop: "20px",
                        textAlign: "center",
                        padding: "10px 0",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      &copy; {new Date().getFullYear()} INDUSTRY MALL. All
                      rights reserved.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </footer>
  );
};

export default FooterSection;
