import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OrderedItem from "./account/checkoutWizard/shopping cart components/OrderedItem";
import OrderSummary from "./account/checkoutWizard/shopping cart components/OrderSummary";
import OrderSummaryField from "./account/checkoutWizard/shopping cart components/OrderSummaryField";
import OrderSummaryFieldMobile from "./account/checkoutWizard/shopping cart components/OrderSummaryFieldMobile";
import { formatDate } from "utils/utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import ParcelItem from "./account/checkoutWizard/shopping cart components/ParcelItem";

interface Order {
  id: null;
  date: "";
  o_vendor_id: null;
  first_name: "";
  last_name: "";
  company: "";
  country: "";
  address_01: "";
  address_02: null;
  city: "";
  state: "";
  postal_code: "";
  phone1: "";
  phone2: null;
  email: "";
  comments: null;
  payment_method: "";
  status: "";
  shipping: null;
  shipping_full_name: "";
  shipping_company_name: "";
  shipping_email: null;
  shipping_contact_number: "";
  shipping_address: "";
  shipping_city: "";
  shipping_state: null;
  shipping_country: "";
  shipping_zipcode: "";
  updatedby: null;
  customer_id: null;
  created_at: "";
  updated_at: "";
  total_price: 0;
  discount: 0;
  product_orders_details: [
    {
      id: null;
      order_id: null;
      product_id: null;
      quantity: null;
      p_price: null;
      p_vendor_id: null;
      status: "";
      created_at: "";
      updated_at: "";
      product_details: {
        id: null;
        code: null;
        name: "";
        new_price: "";
        new_sale_price: "";
        sku: "";
        description: "";
        details: "";
        brand_id: null;
        menu_id: null;
        category_id: null;
        subcategory_id: null;
        model_no: "";
        make: "";
        type: null;
        slug: "";
        parent_id: null;
        refurnished_price: "";
        refurnished_sale_price: "";
        new_warranty_days: null;
        new_return_days: null;
        refurnished_return_days: null;
        refurnished_warranty_days: null;
        attachment: "";
        weight_unit: "";
        weight: "";
        m_unit: "";
        width: "";
        height: "";
        depth: "";
        min_order: null;
        min_ref_order: null;
        tax_title: null;
        tax_type: null;
        tax_charges: 0;
        Other_tax: 0;
        url: "";
        feature_image: "";
        status: null;
        created_by: null;
        updated_by: null;
        created_at: "";
        updated_at: "";
      };
    }
  ];
}

interface Parcel {
  id: null;
  order_id: null;
  product_id: null;
  quantity: 1;
  p_price: 0;
  p_vendor_id: null;
  status: "";
  created_at: "";
  updated_at: "";
  product_details: {
    id: null;
    code: null;
    name: "";
    new_price: "";
    new_sale_price: "";
    sku: "";
    description: "";
    details: "";
    brand_id: null;
    menu_id: null;
    category_id: null;
    subcategory_id: null;
    model_no: "";
    make: "";
    type: null;
    slug: "";
    parent_id: null;
    refurnished_price: "";
    refurnished_sale_price: "";
    new_warranty_days: null;
    new_return_days: null;
    refurnished_return_days: null;
    refurnished_warranty_days: null;
    attachment: "";
    weight_unit: "";
    weight: "";
    m_unit: "";
    width: "";
    height: "";
    depth: "";
    min_order: null;
    min_ref_order: null;
    tax_title: null;
    tax_type: null;
    tax_charges: 0;
    Other_tax: 0;
    url: "";
    feature_image: "";
    status: null;
    created_by: null;
    updated_by: null;
    created_at: "";
    updated_at: "";
  };
}

const ParcelDetails = () => {
  const router = useRouter();
  const { specificOrderId, specificParcelId } = router.query;
  const [id, setId] = useState("");
  const [data, setData] = useState({ orders: [], orderTrackerByProduct: [] });
  const [order, setOrder] = useState<Order>();
  const [parcel, setParcel] = useState<Parcel>();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    const loadItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${id}/orders`
        );
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    loadItems();
  }, [id]);

  useEffect(() => {
    console.log("specificOrderId:", specificOrderId);
    console.log("orders:", data.orders);
    console.log("checking: ", data.orders[0]?.id == specificOrderId);
    for (let i = 0; i < data.orders.length; i++) {
      if (data.orders[i].id == specificOrderId) {
        setOrder(data.orders[i]);
        console.log("filtered order:", order);
      }
    }
  }, [data, specificOrderId]);

  const shippingDiscount = 30;

  useEffect(() => {
    for (let i = 0; i < order?.product_orders_details.length; i++) {
      if (
        order?.product_orders_details[i].product_id === Number(specificParcelId)
      ) {
        setParcel(order?.product_orders_details[i]);
        break;
      }
    }
  }, [order, specificParcelId]);

  useEffect(() => {
    console.log("parcel placed", parcel);
    let totalPrice = parcel?.quantity * parcel?.p_price;
    setTotalPrice(totalPrice);
  }, [parcel]);

  return (
    <div>
      <section className="cart-section section-big-py-space">
        <div className="custom-container">
          <div className="row">
            <div className="col">
              <div className="row d-flex justify-content-between mb-3 border-2 pb-2">
                <div className="col align-items-center">
                  <p>
                    <span className="text-dark">Order ID #::</span> {order?.id}
                  </p>
                  <p>
                    <span className="text-dark">Parcel ID #::</span>
                    {specificParcelId}
                  </p>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <span className="d-flex justify-content-end">
                      <p className="me-3 mt-1">
                        <span className="text-dark">Order Placed On:</span>{" "}
                        {formatDate(order?.created_at)}
                      </p>
                      <button className="btn btn-sm color-bg-blue mb-2 me-2 text-white shadow">
                        <FontAwesomeIcon icon={faPrint} />
                        &nbsp; Print Invoice
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex flex-column-reverse flex-lg-row">
            <div className="col-lg-7 col-md-12 col-sm-12 mb-3 mx-auto">
              <ParcelItem
                item={parcel?.product_details}
                orderProductDetails={parcel}
              />
              <div className="container rounded rounded-3 p-2 m-2 text-start">
                <h5
                  className="text-dark"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  Billing Address:
                </h5>
                <p>
                  <span>{order?.first_name}</span>&nbsp;
                  <span>{order?.last_name}</span>&nbsp;|&nbsp;
                  <span>{order?.phone1}</span>&nbsp;|&nbsp;
                  <span>{order?.email}</span>
                </p>
                <br />
                <p>{order?.address_01}</p>
                <p>
                  {order?.city}&nbsp;|&nbsp;
                  {order?.country}&nbsp;|&nbsp;
                  {order?.company}&nbsp;|&nbsp;
                  {order?.shipping_zipcode}
                </p>
              </div>
              <div className="container rounded rounded-3 p-2 m-2 text-start">
                <h5
                  className="text-dark"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  Shipping Address:
                </h5>
                <p>
                  <span>{order?.first_name}</span>&nbsp;
                  <span>{order?.last_name}</span>&nbsp;|&nbsp;
                  <span>{order?.phone1}</span>&nbsp;|&nbsp;
                  <span>{order?.email}</span>
                </p>
                <br />
                <p>{order?.shipping_address}</p>
                <p>
                  {order?.city}&nbsp;|&nbsp;
                  {order?.state}&nbsp;|&nbsp;
                  {order?.country}&nbsp;|&nbsp;
                  {order?.shipping_zipcode}
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-7 col-sm-12 mb-3 mx-auto">
              <OrderSummary>
                <>
                  <>
                    {/* for laptop and above screen */}
                    <>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total"
                          price={`$${totalPrice}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Discount Applied"
                          price={`$${order?.discount}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Tax"
                          price={`$${parcel?.product_details?.tax_charges}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Shipping"
                          price={`$${order?.shipping}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Shipping Fee Discount"
                          price={`-$${shippingDiscount}`}
                        />
                      </div>
                    </>
                    {/* for mobile screen */}
                    <>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total"
                          price={`$${order?.total_price}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total Discount Applied"
                          price={`$${order?.discount}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name={`Total Tax ${"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} `}
                          price={`$${parcel?.product_details?.tax_charges}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total Shipping"
                          price={`$${order?.shipping}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Shipping Fee Discount"
                          price={`$${shippingDiscount}`}
                        />
                      </div>
                    </>

                    <div className="row d-flex justify-content-between mb-1">
                      &nbsp;
                    </div>
                    <div className="row d-flex justify-content-between mb-1">
                      <div className=" border-0">
                        <hr
                          style={{
                            border: "1px dashed ",
                            margin: "0",
                          }}
                        />
                      </div>
                    </div>
                    <div className="row d-flex justify-content-between mb-1">
                      &nbsp;
                    </div>
                    {/* for laptop and above screen */}
                    <div className="d-none d-sm-block">
                      <OrderSummaryField
                        name="Grand Total"
                        price={`$${
                          totalPrice -
                          shippingDiscount +
                          parcel?.product_details?.tax_charges
                        }`}
                      />
                    </div>
                    {/* for mobile screen */}
                    <div className="d-block d-sm-none">
                      <OrderSummaryFieldMobile
                        name="Grand Total"
                        price={order?.total_price}
                      />
                    </div>
                    <div>
                      <div className="row d-flex justify-content-between mb-1">
                        &nbsp;
                      </div>
                      <div className="row d-flex justify-content-between mb-1">
                        &nbsp;
                      </div>
                      {/* for laptop and above screen */}
                      <div
                        className="d-none d-sm-block ps-2 pe-2"
                        style={{ backgroundColor: "#fef6f3" }}
                      >
                        <OrderSummaryField
                          name="Payment Method"
                          price={
                            order?.payment_method?.toUpperCase() !== "COD"
                              ? "Online"
                              : "COD"
                          }
                        />
                      </div>
                      {/* for mobile screen */}
                      <div className="d-block d-sm-none ps-2 pe-2">
                        <OrderSummaryFieldMobile
                          name="Payment Method"
                          price={
                            order?.payment_method?.toUpperCase() !== "COD"
                              ? "Online"
                              : "COD"
                          }
                        />
                      </div>
                    </div>
                  </>
                </>
              </OrderSummary>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParcelDetails;
