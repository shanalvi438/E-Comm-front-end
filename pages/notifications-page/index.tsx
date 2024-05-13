import React, { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Layout1 from "views/layouts/layout1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faEnvelope,
 faEnvelopeOpen,
 faEye,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Notification = () => {
 const [key, setKey] = useState("all");

 // Sample data for demonstration
 const [allMessages, setAllMessages] = useState([
    { id: 1, title: "Digital Camera", date: new Date(), unread: false },
    { id: 2, title: "Digital Camera", date: new Date(), unread: false },
    { id: 3, title: "Digital Camera", date: new Date(), unread: true },
    { id: 4, title: "Digital Camera", date: new Date(), unread: true },
    { id: 5, title: "Digital Camera", date: new Date(), unread: true },
 ]);

 const unreadMessages = allMessages.filter((msg) => msg.unread);

 const markAsRead = (id) => {
    setAllMessages(
      allMessages.map((msg) =>
        msg.id === id ? { ...msg, unread: false } : msg
      )
    );
 };

 return (
    <Layout1>
      <div className="custom-container ">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="">
          <Tab eventKey="all" title={`All (${allMessages.length})`}>
            {allMessages.map((msg, index) => (
              <div
                key={index}
                className={`main d-flex justify-content-between m-2`}
              >
                <div className="d-flex">
                 <img className="col-1" src="/images/blog/camera.jpg" alt="" />
                 <div className="mx-4">
                    <p>Title</p>
                    <p>{msg.title}</p>
                 </div>
                </div>
                <div className="right-side d-flex  text-center">
                 <div>
                    <div className="mx-2">{msg.date.toLocaleDateString()}</div>
                    <div className="mx-2">{msg.date.toLocaleTimeString()}</div>
                 </div>
                 <div className=" mt-2 ">
                    <FontAwesomeIcon
                      icon={msg.unread ? faEnvelope : faEnvelopeOpen}
                    />
                 </div>
                 {msg.unread && (
                    <div className="m-2" onClick={() => markAsRead(msg.id)}>
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                 )}
                </div>
              </div>
            ))}
          </Tab>
          <Tab eventKey="unread" title={`Unread (${unreadMessages.length})`}>
            {unreadMessages.map((msg, index) => (
              <div
                key={index}
                className={`main d-flex justify-content-between  `}
              >
                <div className="d-flex">
                 <img className="col-1" src="/images/blog/camera.jpg" alt="" />
                 <div className="ml-5">
                    <p>Title</p>
                    <p>{msg.title}</p>
                 </div>
                </div>
                <div className="right-side d-flex">
                 <div>
                    <div className="mx-2">{msg.date.toLocaleDateString()}</div>
                    <div className="mx-2">{msg.date.toLocaleTimeString()}</div>
                 </div>
                 <div className="mt-2">
                    <FontAwesomeIcon icon={faEnvelope} />
                 </div>
                 {msg.unread && (
                    <div className="mt-2" onClick={() => markAsRead(msg.id)}>
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                 )}
                </div>
              </div>
            ))}
          </Tab>
        </Tabs>
      </div>
    </Layout1>
 );
};

export default Notification;
