// CheckoutProvider.tsx

import React, { FC, useState } from "react";
import CheckoutContext from "./checkout.context";

interface CheckoutProviderProps {
  children; // Define children prop here
}

const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  return (
    <CheckoutContext.Provider
      value={{
        selectedCoupons,
        setSelectedCoupons,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
