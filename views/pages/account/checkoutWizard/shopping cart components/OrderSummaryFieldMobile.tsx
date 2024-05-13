const OrderSummaryFieldMobile = ({ name, price }) => {
  return (
    <>
      <tr>
        <td className="col-4 text-start">{name}</td>
        <td className="col-3 text-end">{price}</td>
      </tr>
    </>
  );
};

export default OrderSummaryFieldMobile;
