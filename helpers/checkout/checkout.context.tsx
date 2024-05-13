// CheckoutContext.tsx

import { createContext, useContext } from "react";

interface CheckoutContextProps {
  selectedCoupons: number[];
  setSelectedCoupons: (coupons: number[]) => void;
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (paymentMethod: string | null) => void;
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(
  undefined
);

export const useCheckout = (): CheckoutContextProps => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};

export default CheckoutContext;
