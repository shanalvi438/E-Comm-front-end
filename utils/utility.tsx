export const renderTinyMCEData = (info) => {
  if (info) {
    return <div dangerouslySetInnerHTML={{ __html: info }} />;
  }
  return null;
};

export const renderTinyMCEDataUnBold = (info) => {
  if (info) {
    // Remove <strong> tags and newline characters from the HTML
    const cleanedHtml = info
      .replace(/<h3>/g, "")
      .replace(/<\/h3>/g, "")
      .replace(/[\n\r]/g, "");

    return (
      <div
        style={{ whiteSpace: "nowrap" }}
        dangerouslySetInnerHTML={{ __html: cleanedHtml }}
      />
    );
  }
  return null;
};

export const formatDate = (
  isoDate,
  monthInEnglish?,
  dayInEnglish?,
  order = "dmy"
) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  let month: string | number;
  if (monthInEnglish) {
    month = date.toLocaleString("default", { month: "long" });
  } else {
    month = date.getMonth() + 1;
  }
  const year = date.getFullYear();

  let formattedDate = "";

  if (order === "dmy") {
    formattedDate = `${day}-${month}-${year}`;
  } else if (order === "mdy") {
    formattedDate = `${month}-${day}-${year}`;
  } else if (order === "ymd") {
    formattedDate = `${year}-${month}-${day}`;
  }

  if (dayInEnglish) {
    const dayInEnglish = date.toLocaleString("default", { weekday: "long" });
    formattedDate = `${dayInEnglish}, ${formattedDate}`;
  }

  return formattedDate;
};

export const calculateProductTotal = (item) => {
  const selectedPrice =
    item.condition === "New"
      ? item.new_sale_price
      : item.refurnished_sale_price;
  return selectedPrice * item.qty;
};

// Calculate the overall cart total price
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + calculateProductTotal(item), 0);
};
