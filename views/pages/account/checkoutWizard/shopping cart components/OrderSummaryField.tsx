const OrderSummaryField = ({ name, price }) => {
  return (
    <div className="row d-flex justify-content-between mb-1">
      <div className="col text-start border-0 text-secondary">{name}</div>
      <div className="col text-end border-0 text-secondary">{price}</div>
    </div>
  );
};

export default OrderSummaryField;
