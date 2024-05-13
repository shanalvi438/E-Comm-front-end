import React from "react";
import Layout1 from "views/layouts/layout1";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => {
  return (
    <Layout1>
      <div className="custom-container mx-auto">
        <div className="mx-auto text-center" style={{ maxWidth: "600px" }}>
        <h3>Track Your Order Form</h3>
          <Form>
            <Form.Group controlId="trackingNumber">
              <Form.Label>Tracking #</Form.Label>
              <Form.Control type="text" placeholder="Enter tracking number" />
            </Form.Group>

            <Form.Group controlId="emailId">
              <Form.Label>Email ID</Form.Label>
              <Form.Control type="email" placeholder="Enter email ID" />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-5">
              Track
            </Button>
          </Form>
        </div>
      </div>
    </Layout1>
  );
};

export default Index;
