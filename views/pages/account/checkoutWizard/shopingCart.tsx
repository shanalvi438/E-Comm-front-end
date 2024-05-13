import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { CartContext } from "../../../../helpers/cart/cart.context";
import { CurrencyContext } from "../../../../helpers/currency/CurrencyContext";
import Link from "next/link";
import CartItem from "views/pages/account/checkoutWizard/shopping cart components/CartItem";
import OrderSummary from "./shopping cart components/OrderSummary";
import OrderSummaryField from "./shopping cart components/OrderSummaryField";
import OrderSummaryFieldMobile from "./shopping cart components/OrderSummaryFieldMobile";
import axios from "axios";
import { GET_SPONSORED_PRODUCT } from "utils/constants";
import { useCheckout } from "helpers/checkout/checkout.context";
import { calculateCartTotal } from "utils/utility";

const ShoppingCart: NextPage = () => {
  const { cartItems, updateQty, removeFromCart } = useContext(CartContext);
  const { selectedCurr } = useContext(CurrencyContext);
  const { symbol } = selectedCurr;
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [coupens, setCoupens] = useState([]);
  const { selectedCoupons, setSelectedCoupons } = useCheckout();

  const shippingCharges = 30;

  const cartTotal = cartItems.reduce((total, item) => {
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

  useEffect(() => {
    console.log("cart items", cartItems);
  }, []);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await axios.get(GET_SPONSORED_PRODUCT);
        const itemData = response.data;
        setCoupens(itemData.Coupons);
        console.log("itemData", itemData);
      } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, []);

  // Calculate total discount based on selected coupons
  const totalDiscountAmount = selectedCoupons.reduce((total, couponIndex) => {
    // Assuming you have an array of coupons with a 'percentage' field
    const coupon = coupens[couponIndex];

    // Check if coupens array has an item at the specified index
    if (coupon && typeof coupon.percentage === "string") {
      // Convert the percentage string to a number
      const couponPercentage: number = parseFloat(coupon.percentage);

      // Check if the conversion is successful and it's a valid number
      if (!isNaN(couponPercentage)) {
        // Calculate the discount amount for each coupon
        const discountAmount: number = (cartTotal * couponPercentage) / 100;
        // Add the discount amount to the total
        return total + discountAmount;
      } else {
        // Handle the case where the conversion fails
        console.error(`Invalid percentage: ${coupon.percentage}`);
        return total;
      }
    } else {
      // Handle the case where coupens array doesn't have an item at the index
      console.error(`Invalid coupon at index: ${couponIndex}`);
      return total;
    }
  }, 0);

  // Calculate the total after deducting the discount
  const grandTotal = cartTotal - totalDiscountAmount - shippingCharges;

  const totalTax = cartItems.reduce((total, product) => {
    // Assuming each product has 'Other_tax' and 'tax_charges' fields
    // const productTax = product.Other_tax + product.tax_charges;
    const productTax = 30;
    // Add the product tax to the total
    return total + productTax;
  }, 0);

  // Check for stored coupons in local storage on component mount
  useEffect(() => {
    const storedCoupons = localStorage.getItem("selectedCoupons");
    if (storedCoupons) {
      setSelectedCoupons(JSON.parse(storedCoupons));
    }
  }, [setSelectedCoupons]);

  // Update local storage whenever selectedCoupons changes
  useEffect(() => {
    localStorage.setItem("selectedCoupons", JSON.stringify(selectedCoupons));
  }, [selectedCoupons]);

  return (
    <>
      <section className="cart-section section-big-py-space">
        <div className="custom-container">
          <div className="row d-flex flex-column-reverse flex-lg-row">
            <div className="col-lg-7 col-md-12 col-sm-12 mb-3 mx-auto">
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  removeFromCart={removeFromCart}
                  handleQtyUpdate={handleQtyUpdate}
                  quantityError={quantityError}
                  coupens={coupens}
                />
              ))}
            </div>
            <div className="col-lg-4 col-md-8 col-sm-12 mb-3 mx-auto">
              <OrderSummary>
                <>
                  <>
                    {/* for laptop and above screen */}
                    <>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total"
                          price={`${symbol}${calculateCartTotal(cartItems)}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Discount Applied"
                          price={`${symbol}${totalDiscountAmount}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Tax"
                          price={`${symbol}${totalTax}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Shipping"
                          price={`${symbol}${shippingCharges}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Shipping Fee Discount"
                          price={`-${symbol}${shippingCharges}`}
                        />
                      </div>
                    </>
                    {/* for mobile screen */}
                    <>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total"
                          price={`${symbol}${cartTotal.toFixed(2)}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total Discount Applied"
                          price={`${symbol}120`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name={`Total Tax ${"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} `}
                          price={`${symbol}54`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total Shipping"
                          price={`${symbol}30`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Shipping Fee Discount"
                          price={`-$30`}
                        />
                      </div>
                    </>
                    <div className="row d-flex justify-content-between mb-1">
                      &nbsp;
                    </div>
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
                        price={`${symbol}${grandTotal}`}
                      />
                    </div>
                    {/* for mobile screen */}
                    <div className="d-block d-sm-none">
                      <OrderSummaryFieldMobile
                        name="Grand Total"
                        price={`${symbol}${grandTotal}`}
                      />
                    </div>
                    <div className="row d-flex justify-content-between mb-1">
                      &nbsp;
                    </div>
                    <div className="row d-flex justify-content-between mb-1">
                      &nbsp;
                    </div>
                    <div>
                      <div className="d-flex justify-content-center">
                        <button
                          style={{ backgroundColor: "#0071bc" }}
                          className="w-100 btn rounded rounded-pill text-white"
                          disabled
                        >
                          Checkout <span>({cartItems.length} items)</span>
                        </button>
                      </div>
                    </div>
                  </>
                </>
              </OrderSummary>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
