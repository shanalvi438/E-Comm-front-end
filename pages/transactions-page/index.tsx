import React, { useState } from "react";
import { Tab, Tabs, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout1 from "views/layouts/layout1";

const transactions = [
 // Generate dummy data
 ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    date: new Date().toISOString().slice(0, 10),
    type: ["Purchased", "Dispute", "Withdrawal", "Refund", "Cancelled", "Pending"][i % 6],
    amount: Math.floor(Math.random() * 1000),
    status: ["Completed", "Pending"][i % 2],
 })),
];

const Notification = () => {
 const [key, setKey] = useState("all");

 const renderTable = (filter) => {
    let filteredTransactions = transactions;
    if (filter === "completed") {
        filteredTransactions = transactions.filter(t => t.status === "Completed");
    } else if (filter !== "all") {
        filteredTransactions = transactions.filter(t => t.type === filter);
    }
    return (
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Type</th>
            <th>Amounts $</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t, index) => (
            <tr key={t.id}>
              <td>{index + 1}</td>
              <td>{t.date}</td>
              <td>{t.id}</td>
              <td>{t.type}</td>
              <td>${t.amount}</td>
              <td style={{ color: t.status === "Completed" ? "green" : "red" }}>
                {t.status}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
 };

 return (
    <Layout1>
<div className="custom-container">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="all" title={`All Transactions (${transactions.length})`}>
          {renderTable("all")}
        </Tab>
        <Tab eventKey="purchased" title={`Total Purchased (${transactions.filter(t => t.type === "Purchased").length})`}>
          {renderTable("Purchased")}
        </Tab>
        <Tab eventKey="dispute" title={`Total Dispute (${transactions.filter(t => t.type === "Dispute").length})`}>
          {renderTable("Dispute")}
        </Tab>
        <Tab eventKey="withdrawal" title={`Total Withdrawal (${transactions.filter(t => t.type === "Withdrawal").length})`}>
          {renderTable("Withdrawal")}
        </Tab>
        <Tab eventKey="refund" title={`Total Refund (${transactions.filter(t => t.type === "Refund").length})`}>
          {renderTable("Refund")}
        </Tab>
        <Tab eventKey="cancelled" title={`Total Cancelled (${transactions.filter(t => t.type === "Cancelled").length})`}>
          {renderTable("Cancelled")}
        </Tab>
        <Tab eventKey="pending" title={`Total Pending (${transactions.filter(t => t.type === "Pending").length})`}>
          {renderTable("Pending")}
        </Tab>
        <Tab eventKey="completed" title={`Total Completed (${transactions.filter(t => t.status === "Completed").length})`}>
          {renderTable("completed")}
        </Tab>
      </Tabs>
    </div>

    </Layout1>
 );
};

export default Notification;
