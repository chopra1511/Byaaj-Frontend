import React from "react";

const IndianNumberFormat = ({ amount }) => {
  const formatAmount = (value) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(value);
  };

  return <>₹{formatAmount(amount)}</>;
};

export default IndianNumberFormat;
