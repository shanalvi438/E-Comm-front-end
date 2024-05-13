import React, { useState } from "react";
import Layout1 from "views/layouts/layout1";
import { Tab, Tabs, Table } from "react-bootstrap";

const Opendata = () => {
  // Sample data for datas
  const [datas] = useState([
    {
      iam: "Zubair",
      opponentProfileUrl: "www.zubair.com",
      productUrl: "www.mydata",
      productSKU: "N/A",
      status: "Pending",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.",
      img: "/images/Dashboard Icons/All-Orders.png",
    },
    {
      iam: "Haseeb",
      opponentProfileUrl: "www.zubair.com",
      productUrl: "www.mydata",
      productSKU: "N/A",
      status: "Received",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.",
      img: "/images/Dashboard Icons/All-Orders.png",
    },
    {
      iam: "nabeel",
      opponentProfileUrl: "www.zubair.com",
      productUrl: "www.mydata",
      productSKU: "N/A",
      status: "Pending",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.",
      img: "/images/Dashboard Icons/All-Orders.png",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const processDataByStatus = (status) => {
    return datas
      .filter((data) => status === "all" || data.status === status)
      .map((data, index) => (
        <div key={index}>
          <Table striped bordered hover >
            <thead >
              <tr>
                <th>Iam</th>
                <th>Opponent Profile URL</th>
                <th>Product URL</th>
                <th>Product SKU</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.iam}</td>
                <td>{data.opponentProfileUrl}</td>
                <td>{data.productUrl}</td>
                <td>{data.productSKU}</td>
                <td
                  style={{
                    color: data.status === "Pending" ? "orange" : "green",
                  }}
                >
                  {data.status}
                </td>
              </tr>
            </tbody>
          </Table>
          <div>
            <h5>Message:</h5>
            <p>{data.message}</p>
          </div>
          <img className="col-1" src={data.img} alt="First data image" />
          <img className="col-1" src={data.img} alt="First data image" />
          <hr />
        </div>
      ));
  };

  return (
    <Layout1>
      <div className="custom-container">
        <Tabs
          className=""
          id="data-tabs"
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
        >
          <Tab eventKey="all" title={`All datas (${datas.length})`}>
            {processDataByStatus("all")}
          </Tab>
          <Tab
            eventKey="pending"
            title={`Pending (${
              datas.filter((data) => data.status === "Pending").length
            })`}
          >
            {processDataByStatus("Pending")}
          </Tab>
          <Tab
            eventKey="received"
            title={`Received (${
              datas.filter((data) => data.status === "Received").length
            })`}
          >
            {processDataByStatus("Received")}
          </Tab>
        </Tabs>
      </div>
    </Layout1>
  );
};

export default Opendata;
