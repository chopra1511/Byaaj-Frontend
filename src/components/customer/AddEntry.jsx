import { Button, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, useParams } from "react-router";
import IndianNumberFormat from "../utils/IndianNumberFormat";
import { useMutation } from "@apollo/client";
import { ADD_ENTRY } from "../../mutations/CustomerMutations";
import { ALL_CUSTOMERS, GET_ENTRIES } from "../../queries/CustomerQueries";
import TransactionDone from "../utils/TransactionDone";

const AddEntry = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [showTransactionDone, setShowTransactionDone] = useState(false);

  const navigate = useNavigate();
  const { customerID } = useParams();
  const location = useLocation();
  const { type,name } = location.state || {};

  const detailRef = useRef();
  

  const [addEntry] = useMutation(ADD_ENTRY);

  const handleEntryForm = (e) => {
    e.preventDefault();
    addEntry({
      variables: {
        customerID: customerID,
        amount: parseFloat(amount),
        details: detailRef.current.value,
        date: startDate,
        type,
      },
      refetchQueries: [
        {
          query: GET_ENTRIES,
          variables: { customerID: customerID },
        },
        {
          query: ALL_CUSTOMERS,
        },
      ],
    });

    setShowTransactionDone(true);
    setTimeout(() => {
      setShowTransactionDone(false);
      navigate(-1);
    }, 2000);
  };

  // Helper to get type-based styles
  const getTypeStyles = (type) => {
    if (type === "Paid")
      return "text-red-600 outline-red-600 placeholder:text-red-400";
    if (type === "Got")
      return "text-green-500 outline-green-500 placeholder:text-green-400";
    return "";
  };

  const typeStyles = getTypeStyles(type);

  return (
    <>
      {!showTransactionDone && (
        <div>
          <div className="p-2 lg:w-1/4 bg-white drop-shadow-xl flex items-center justify-between fixed top-0 left-0 right-0 z-10">
            <IconButton onClick={() => navigate(-1)}>
              <i className={`fi fi-br-arrow-left pt-1 px-2 ${typeStyles}`}></i>
            </IconButton>
            <h1 className={`text-lg font-Poppins font-semibold capitalize ${typeStyles}`}>
              {type === "Paid" ? (
                <>
                  You gave {name} <IndianNumberFormat amount={amount} />
                </>
              ) : type === "Got" ? (
                <>
                  {name} gave you <IndianNumberFormat amount={amount} />
                </>
              ) : (
                ""
              )}
            </h1>
            <i className="fi fi-br-menu-dots-vertical pt-1 px-2 invisible"></i>
          </div>

          <div className="mt-24 px-5">
            <form onSubmit={handleEntryForm}>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative grid col-span-2">
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                    className={`relative py-3 px-8 border text-lg rounded-lg w-full ${typeStyles} font-Poppins font-medium`}
                  />
                  <i
                    className={`fi fi-br-indian-rupee-sign ${typeStyles} pt-1 absolute top-3 left-3`}
                  ></i>
                </div>
                {amount > 0 && (
                  <div className="grid col-span-2">
                    <input
                      type="text"
                      placeholder="Enter Detatils"
                      ref={detailRef}
                      className={`relative py-2 px-3 border text-sm rounded-lg w-full outline-gray-400 font-Poppins font-medium`}
                    />
                  </div>
                )}
                {amount > 0 && (
                  <div className="relative grid col-span-1">
                    <DatePicker
                      className={`relative w-full text-[12px] font-semibold ${typeStyles} font-Poppins border py-2 px-8 rounded-lg`}
                      selected={startDate}
                      popperPlacement="bottom-end"
                      onChange={(date) => setStartDate(date)}
                    />
                    <i
                      className={`fi fi-rr-calendar-day ${typeStyles} pt-1 absolute top-1 left-3`}
                    ></i>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-1/4 p-5 fixed bottom-0 right-0 left-0">
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  type="submit"
                  sx={{
                    width: "100%",
                    backgroundColor:
                      type === "Paid"
                        ? "#ef4444"
                        : type === "Got"
                        ? "#22c55e"
                        : "#3b82f6",
                    color: "white",
                    fontFamily: "Poppins",
                    fontSize: 16,
                    borderRadius: "10px",
                    ":hover": {
                      backgroundColor:
                        type === "Paid"
                          ? "#dc2626"
                          : type === "Got"
                          ? "#16a34a "
                          : "#3b82f6",
                    },
                  }}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* TransactionDone Modal */}
      {showTransactionDone && <TransactionDone />}
    </>
  );
};

export default AddEntry;
