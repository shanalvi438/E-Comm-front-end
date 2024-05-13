const OrderSummary = ({ children }) => {
  return (
    <div
      style={{
        border: "2px dashed",
      }}
      className="col rounded text-secondary rounded-5 p-4"
    >
      <hr style={{ border: "4px solid ", margin: "0" }} />
      <h4 className="fw-bold text-dark text-start fs-4 mt-1 mb-1">
        Order Summary
      </h4>
      <div className="container-fluid p-0">{children}</div>
    </div>
  );
};

export default OrderSummary;
