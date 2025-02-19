import { useMemo } from "react";

const useBalanceTotals = (customers) => {
  const { paidTotal, gotTotal, interestTotal } = useMemo(() => {
    const balance = customers?.map((customer) => customer.entries[0].balance);

    const paidTotal = balance
      ?.filter((total) => total.type === "Paid")
      .map((total) => total.totalAmount)
      .reduce((a, b) => a + b, 0); // Default initial value to 0

    const gotTotal = balance
      ?.filter((total) => total.type === "Got")
      .map((total) => total.totalAmount)
      .reduce((a, b) => a + b, 0); // Default initial value to 0

    // Calculate total interest based on updated balances
    const interestTotal = customers?.map((customer) => {
      if (customer.interest > 0) {
        return (
          (customer.entries[0].balance.totalAmount * customer.interest) / 100
        );
      } else {
          return 0;
      }
    });

    return { paidTotal, gotTotal, interestTotal };
  }, [customers]); // Recalculates only when `customers` changes

  return { paidTotal, gotTotal, interestTotal };
};

export default useBalanceTotals;
