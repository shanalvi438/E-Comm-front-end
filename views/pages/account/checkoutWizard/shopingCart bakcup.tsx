import React, { useState } from "react";
import { NextPage } from "next";
import { CartContext } from "../../../../helpers/cart/cart.context";
import { CurrencyContext } from "../../../../helpers/currency/CurrencyContext";
import Link from "next/link";

const ShoppingCart: NextPage = () => {
  const { cartItems, updateQty, removeFromCart } =
    React.useContext(CartContext);
  const { selectedCurr } = React.useContext(CurrencyContext);
  const { symbol } = selectedCurr;
  const [quantityError, setQuantityError] = useState<boolean>(false);

  const cartTotal = cartItems.reduce((total, item, handleQtyUpdate) => {
    const price =
      item.condition === "New"
        ? item.new_sale_price
        : item.refurnished_sale_price;
    return total + price * item.qty;
  }, 0);

  const handleQtyUpdate = (item, quantity) => {
    const parsedQty = parseInt(quantity, 10);
    if (parsedQty >= 1) {
      setQuantityError(false);
      updateQty(item, parsedQty);
      setQuantityError(true);
    }
  };

  return (
    <>
      <section className="cart-section section-big-py-space">
        <div className="custom-container">
          {cartItems && cartItems.length > 0 ? (
            <>
              <div className="row">
                <div className="col-sm-12">
                  <table className="table cart-table table-responsive-xs p-5">
                    <thead>
                      <tr className="table-head">
                        <th scope="col">image</th>
                        <th scope="col">product name</th>
                        <th scope="col">price</th>
                        <th scope="col">coupen</th>
                        <th scope="col">quantity</th>
                        <th scope="col">Tax</th>
                        <th scope="col">total</th>
                        <th scope="col">action</th>
                      </tr>
                    </thead>
                    {cartItems.map((item, index) => (
                      <tbody key={`cart-list-${index}`}>
                        <tr>
                          <td>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <img src={item.url} alt="cart" className=" " />
                            </a>
                          </td>
                          <td>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              {item.name}
                            </a>
                            <div className="mobile-cart-content row">
                              <div className="col-xs-3 col-3">
                                <div className="qty-box">
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      name="quantity"
                                      onChange={(e) =>
                                        handleQtyUpdate(item, e.target.value)
                                      }
                                      className="form-control input-number"
                                      defaultValue={item.qty}
                                      style={{
                                        borderColor: quantityError && "red",
                                      }}
                                      min="1"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xs-3 col-3">
                                <h2 className="td-color">
                                  {symbol}
                                  {item.condition === "New"
                                    ? item.new_sale_price
                                    : item.refurnished_sale_price}
                                </h2>
                              </div>
                              <div className="col-xs-3 col-3">
                                <h2 className="td-color">
                                  <a
                                    href="#"
                                    className="icon"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <i className="ti-close"></i>
                                  </a>
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2>
                              {symbol}
                              {item.condition === "New"
                                ? item.new_sale_price
                                : item.refurnished_sale_price}
                            </h2>
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter your coupon code"
                            />
                            {/* craete a button to apply coupen */}
                            <a
                              href="#"
                              className="wizard-btn"
                              style={{
                                backgroundColor: "#0272BC",
                                marginTop: "5px",
                              }}
                            >
                              apply
                            </a>
                          </td>
                          <td>
                            <div className="qty-box">
                              <div className="input-group">
                                <input
                                  type="number"
                                  name="quantity"
                                  onChange={(e) =>
                                    handleQtyUpdate(item, e.target.value)
                                  }
                                  className="form-control input-number"
                                  defaultValue={item.qty}
                                  style={{
                                    borderColor: quantityError && "red",
                                  }}
                                  min="1"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2 className="td-color">
                              {item.tax_charges ? item.tax_charges : "0%"}
                            </h2>
                          </td>
                          <td>
                            <h2 className="td-color">
                              {symbol}
                              {(item.condition === "New"
                                ? item.new_sale_price
                                : item.refurnished_sale_price) * item.qty}
                            </h2>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                removeFromCart(item);
                              }}
                            >
                              <i className="ti-close"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  <table className="table cart-table table-responsive-md">
                    <tfoot>
                      <tr>
                        <td>total price :</td>
                        <td>
                          <h2>${cartTotal.toFixed(2)}</h2>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="col-sm-12">
              <div>
                <div className="col-sm-12 empty-cart-cls text-center">
                  <img
                    src={`static/images/icon-empty-cart.png`}
                    className="img-fluid mb-4"
                    alt=""
                  />
                  <h3>
                    <strong>Your Cart is Empty</strong>
                  </h3>
                  <h4>Explore more, shortlist some items.</h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
