import React, { useState, useEffect } from "react";
import { CompareContext } from "./compare.context";
import { product } from "../interfaces/product";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const getLocalCompareItems = () => {
 try {
    const list = localStorage.getItem("compare");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
 } catch (err) {
    return [];
 }
};

export const CompareProvider = (props) => {
 const [compareItems, setcompareItems] = useState(getLocalCompareItems() as product[]);
 const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
 const router = useRouter();

 useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compareItems));
 }, [compareItems]);

 // Add Product To Compare
 const addToCompare = (item) => {
    // Check if the compareItems array already contains 5 items
    if (compareItems.length >= 5) {
      toast.error("Max 5 items allowed in compare.", { autoClose: 500 });
      return; // Exit the function if the limit is reached
    }

    const index = compareItems.findIndex((compare) => compare.id === item.id);
    if (index === -1) {
      toast.success("Product Added to Compare Successfully !", { autoClose: 500 });
      setcompareItems([...compareItems, item]);
      // Increment click count for this item
      setClickCounts(prevCounts => ({
        ...prevCounts,
        [item.id]: (prevCounts[item.id] || 0) + 1,
      }));
    } else {
      toast.error("This Product is Already Added to Compare !", { autoClose: 500 });
    }
 };

 // Remove Product From Compare
 const removeFromComapre = (item) => {
    setcompareItems(compareItems.filter((e) => e.id !== item.id));
    toast.error("Product Removed from Compare Successfully !", { autoClose: 500 });
    // Reset click count for this item
    setClickCounts(prevCounts => ({
      ...prevCounts,
      [item.id]: 0,
    }));
 };

 return (
    <CompareContext.Provider
      value={{
        compareItems: compareItems,
        addToCompare: addToCompare,
        removeFromComapre: removeFromComapre,
        clickCounts: clickCounts,
      }}>
      {props.children}
    </CompareContext.Provider>
 );
};
