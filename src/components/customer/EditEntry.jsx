import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, useParams } from "react-router";
import IndianNumberFormat from "../utils/IndianNumberFormat";
import TransactionDone from "../utils/TransactionDone";
import { useMutation } from "@apollo/client";
import { DELETE_ENTRY, EDIT_ENTRY } from "../../mutations/CustomerMutations";
import { ALL_CUSTOMERS, GET_ENTRIES } from "../../queries/CustomerQueries";

const EditEntry = () => {
  const navigate = useNavigate();
  const { customerID } = useParams();
  const location = useLocation();
  const { entry, darkMode } = location.state || {};

    const [startDate, setStartDate] = useState(
    entry?.date ? new Date(Number(entry.date)) : new Date()
  );
  const [amount, setAmount] = useState(entry?.amount || "");
  const [details, setDetails] = useState(entry?.details || "");

  const [showTransactionDone, setShowTransactionDone] = useState(false);

  const [editEntry] = useMutation(EDIT_ENTRY);
  const [deleteEntry] = useMutation(DELETE_ENTRY);

  const handleEntryForm = (e) => {
    e.preventDefault();
  
    editEntry({
      variables: {
        customerID: customerID,
        entryID: entry.id,
        amount: parseFloat(amount),
        details: details,
        date: startDate,
        type: entry.type,
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

  const deleteEntryHandler = () => {
    deleteEntry({
      variables: {
        customerID: customerID,
        entryID: entry.id,
      },
      refetchQueries: [
        {
          query: GET_ENTRIES,
          variables: { customerID: customerID },
        }
      ]
    });
    navigate(-1);
  }

  // Helper to get type-based styles
  const getTypeStyles = (entry) => {
    if (entry.type === "Paid")
      return "text-red-600 outline-red-600 placeholder:text-red-400";
    if (entry.type === "Got")
      return "text-green-500 outline-green-500 placeholder:text-green-400";
    return "";
  };

  const typeStyles = getTypeStyles(entry);

  return (
    <>
      {!showTransactionDone && (
        <div>
          <div
            className={`p-2 lg:w-1/4 ${
              darkMode ? "bg-slate-700" : "bg-white"
            } drop-shadow-xl flex items-center justify-between fixed top-0 left-0 right-0 z-10`}
          >
            <IconButton onClick={() => navigate(-1)}>
              <i className={`fi fi-br-arrow-left pt-1 px-2 ${typeStyles}`}></i>
            </IconButton>
            <h1 className={`text-lg font-Poppins font-semibold ${typeStyles}`}>
              {entry.type === "Paid" ? (
                <>
                  You gave Customer <IndianNumberFormat amount={amount} />
                </>
              ) : entry.type === "Got" ? (
                <>
                  Customer gave you <IndianNumberFormat amount={amount} />
                </>
              ) : (
                ""
              )}
            </h1>
            <i className="fi fi-br-menu-dots-vertical pt-1 px-2 invisible"></i>
          </div>

          <div className={`h-screen ${darkMode ? "bg-slate-900" : ""} pt-24 px-5`}>
            <form onSubmit={handleEntryForm}>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative grid col-span-2">
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`relative py-3 px-8 border text-lg rounded-lg w-full ${darkMode ? "bg-transparent" : ""} ${typeStyles} font-Poppins font-medium`}
                  />
                  <i
                    className={`fi fi-br-indian-rupee-sign ${typeStyles} pt-1 absolute top-3 left-3`}
                  ></i>
                </div>

                <div className="grid col-span-2">
                  <input
                    type="text"
                    placeholder="Enter Detatils"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className={`relative py-2 px-3 border text-sm rounded-lg w-full ${darkMode ? "bg-transparent text-white" : ""} outline-gray-400 font-Poppins font-medium`}
                  />
                </div>

                <div className="relative grid col-span-1">
                  <DatePicker
                    className={`relative w-full text-[12px] font-semibold ${darkMode ? "bg-transparent" : ""} ${typeStyles} font-Poppins border py-2 px-8 rounded-lg`}
                    selected={startDate}
                    popperPlacement="bottom-end"
                    onChange={(date) => setStartDate(date)}
                  />
                  <i
                    className={`fi fi-rr-calendar-day ${typeStyles} pt-1 absolute top-1 left-3`}
                  ></i>
                </div>
              </div>

              <div className="lg:w-1/4 flex fixed bottom-0 left-0 right-0">
                <div className="w-full p-5 flex gap-5  ">
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={deleteEntryHandler}
                    sx={{
                      borderRadius: "10px",
                      fontFamily: "Poppins",
                      textTransform: "capitalize",
                      backgroundColor: "#ef4444",
                      color: "white",
                      fontSize: "16px",
                      padding: "8px 24px",
                    }}
                  >
                    Delete
                  </Button>
                </div>
                {/* Save Button */}
                <div className="w-full p-5 flex gap-5  ">
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{
                      borderRadius: "10px",
                      fontFamily: "Poppins",
                      textTransform: "capitalize",
                      backgroundColor:
                        entry.type === "Paid"
                          ? "#ef4444"
                          : entry.type === "Got"
                          ? "#22c55e"
                          : "#3b82f6",
                      fontSize: "16px",
                      padding: "8px 24px",
                    }}
                  >
                    Save
                  </Button>
                </div>
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

export default EditEntry;
