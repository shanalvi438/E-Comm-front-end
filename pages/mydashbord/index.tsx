import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { MDBContainer } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout1 from "views/layouts/layout1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "reactstrap";

const ChartsPage = () => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  return (
    <Layout1>
      <MDBContainer>
        <h3 className="mt-5">Pie chart</h3>

        <Row className=" mx-auto parent border border-light dotted-border justify-content-between align-content-center">
          <Col md={3} sm={12} xs={12}>
            {" "}
            <div className="left parent border border-2">
              <div className="d-flex">
                <p>Available Balance</p>
                <FontAwesomeIcon
                  icon={faEye}
                  className="mx-2"
                  onClick={toggleAdditionalInfo}
                />
              </div>
              {showAdditionalInfo && (
                <div className="data">
                  <div>
                    <sup>$ </sup>5344 <sub>usd</sub>
                  </div>
                  <div className="d-flex justify-content-between m-3">
                    <div className="btn btn-success mx-2">Deposit</div>
                    <div className="btn btn-primary">Withdraw</div>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col md={6} sm={12} xs={12} >
            <div className=" center-parent border border-2">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={[
                    { name: "Total Withdrawl", value: 400, color: "#F7464A" },
                    { name: "Total Deposit", value: 300, color: "#46BFBD" },
                    { name: "Yellow", value: 100, color: "#FDB45C" },
                    { name: "Grey", value: 40, color: "#949FB1" },
                    { name: "Total Refund", value: 120, color: "#4D5360" },
                  ]}
                  cx="50%"
                  cy="37%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {[
                    { name: "Total Withdrawl", value: 400, color: "#F7464A" },
                    { name: "Total Deposit", value: 300, color: "#46BFBD" },
                    { name: "Yellow", value: 100, color: "#FDB45C" },
                    { name: "Grey", value: 40, color: "#949FB1" },
                    { name: "Total Refund", value: 120, color: "#4D5360" },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </Col>
          <Col md={3} sm={12} xs={12}>
            {" "}
            <div className=" right-parent border border-2">
              <div
                className=""
                style={{
                  borderLeft: "2px solid #46BFBD",
                }}
              >
                <div className="mx-2">
                  <p>Total deposit</p>
                  <p>$854</p>
                  <hr />
                </div>
              </div>
              <div
                className=""
                style={{
                  borderLeft: "2px solid #F7464A",
                }}
              >
                <div className="mx-2">
                  <p>Total Withdrawl</p>
                  <p>$854</p>
                  <hr />
                </div>
              </div>
              <div
                className=""
                style={{
                  borderLeft: "2px solid #4D5360 ",
                }}
              >
                <div className="mx-2">
                  <p>Total Refund</p>
                  <p>$854</p>
                  <hr />
                </div>
              </div>
            </div>
          </Col>
          
        </Row>
      </MDBContainer>
    </Layout1>
  );
};

export default ChartsPage;
