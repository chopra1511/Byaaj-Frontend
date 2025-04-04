import React, { useRef, useState } from "react";
import { IOSSwitch } from "../utils/ToggleSwitch";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, FormControlLabel } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/client";
import { ADD_CUSTOMER } from "../../mutations/CustomerMutations";
import { ALL_CUSTOMERS, UPCOMING_PAYMENTS } from "../../queries/CustomerQueries";
import { useNavigate } from "react-router";

const CustomerFormModal = ({ setOpenModal, darkMode }) => {
  const [isChecked, setChecked] = useState(false);
  const [type, setType] = useState("Paid");
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const [addCustomer, { loading, error }] = useMutation(ADD_CUSTOMER);

  const nameRef = useRef();
  const numberRef = useRef();
  const amountRef = useRef();
  const interestRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCustomer({
        variables: {
          name: nameRef.current.value,
          phone: numberRef.current.value,
          interest: isChecked ? parseFloat(interestRef.current.value) : 0,
          initialAmount: parseFloat(amountRef.current.value),
          initialType: type,
          date: startDate,
        },
        refetchQueries: [{ query: ALL_CUSTOMERS }, {query: UPCOMING_PAYMENTS}],
      });

      // Extract the customer ID from the mutation response
      const customerId = response.data.createCustomer.id;

      navigate(`/customer-info/${customerId}`);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div
      className="lg:w-1/4 fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 px-5"
      onClick={() => setOpenModal(false)}
    >
      <div
        className={`p-5 w-96 ${
          darkMode ? "bg-slate-700" : "bg-white"
        } font-Poppins rounded-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`text-center ${
            darkMode ? "text-white" : "text-slate-700"
          }`}
        >
          <h1 className="text-xl font-Poppins font-bold ">New Customer</h1>
          <p className="text-[12px] font-Quicksand font-semibold">
            Add new customer details
          </p>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div
            className={`grid grid-cols-2 gap-4 mt-5 ${
              darkMode ? "text-white" : "text-slate-700"
            }`}
          >
            <div className="grid col-span-2">
              <label className="text-[12px] font-medium">Customer Name*</label>
              <input
                type="text"
                placeholder="Enter Customer Name"
                ref={nameRef}
                className={`py-2 px-3 text-sm ${
                  darkMode ? "bg-slate-600 outline-white" : "outline-black"
                } border rounded-lg placeholder:text-[12px]`}
              />
            </div>

            <div className="grid col-span-2">
              <label className="text-[12px] font-medium">Phone Number*</label>
              <input
                type="tel"
                placeholder="Enter Customer Number"
                ref={numberRef}
                className={`py-2 px-3 text-sm ${
                  darkMode ? "bg-slate-600 outline-white" : "outline-black"
                } border rounded-lg placeholder:text-[12px]`}
              />
            </div>

            <div className="relative grid col-span-2">
              <label className="text-[12px] font-medium">Initial Amount*</label>
              <input
                type="number"
                placeholder="Enter Initial Amount"
                ref={amountRef}
                className={`relative py-2 px-3 text-sm ${
                  darkMode ? "bg-slate-600 outline-white" : "outline-black"
                } border rounded-lg placeholder:text-[12px]`}
              />
              <select
                className={`absolute top-5 right-2 w-fit text-[12px] py-2 ${
                  darkMode ? "bg-slate-600" : "bg-white"
                } outline-none border-l`}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Paid" className="text-red-500">
                  You Gave
                </option>
                <option value="Got" className="text-green-500">
                  You Got
                </option>
              </select>
            </div>

            <div className="w-fit grid col-span-1">
              <label className="text-[12px] font-medium">On Interest?</label>
              <FormControlLabel
                control={<IOSSwitch sx={{ ml: 2 }} />}
                onClick={(e) => setChecked(e.target.checked)}
              />
            </div>

            {isChecked && (
              <div className="w-fit grid">
                <label className="w-fit text-[12px] font-medium">
                  Interest Rate
                </label>
                <input
                  type="number"
                  placeholder="Enter Interest Rate"
                  step={0.01}
                  ref={interestRef}
                  className={`w-full py-2 px-3 text-sm ${
                    darkMode ? "bg-slate-600 outline-white" : "outline-black"
                  } border rounded-lg placeholder:text-[12px]`}
                />
              </div>
            )}

            <div className="grid col-span-1">
              <label className="text-[12px] font-medium">Date</label>
              <DatePicker
                className={`w-full text-[12px] ${
                  darkMode ? "bg-slate-600 text-white" : "bg-white text-black"
                } font-medium border py-2 px-3 rounded-lg`}
                selected={startDate}
                popperPlacement="bottom-end"
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="mt-5 text-center">
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "100%",
                backgroundColor: darkMode ? "#cbd5e1 " : "#334155",
                color: darkMode ? "black" : "#fff",
                padding: "5px",
                border: "none",
                borderRadius: "8px",
                ":hover": {
                  backgroundColor: "black",
                  color: "white"
                },
              }}
            >
              {loading ? (
                <CircularProgress size={"20px"} color="white" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerFormModal;
