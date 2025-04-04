import { IconButton } from "@mui/material";
import React, { useContext } from "react";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import { ALL_CUSTOMERS, GET_ENTRIES } from "../../queries/CustomerQueries";
import IndianNumberFormat from "../../components/utils/IndianNumberFormat";
import useBalanceTotals from "../../components/customHooks/useBalanceTotal";
import empty from "../../assets/empty.png";
import Loading from "../../components/utils/Loading";
import { DarkModeContext } from "../../components/utils/DarkModeContext";

const AllCustomerList = ({ customer, darkMode }) => {
  const navigate = useNavigate();

  const { data: customerEntriesData } = useQuery(GET_ENTRIES, {
    variables: { customerID: customer.id },
  });
  const customerEntries = customerEntriesData?.entries.entries;
  const date = customerEntries?.[0]?.date
    ? new Date(parseInt(customerEntries[0].date)).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No entries yet";

  let interestAmountPerMonth;
  if (customer?.interest > 0) {
    interestAmountPerMonth =
      (customer?.entries[0]?.balance?.totalAmount || 0) *
      (customer?.interest / 100);
  }

  return (
    <div
      className={`my-3 rounded-xl py-2 px-3 flex items-center justify-between ${
        darkMode ? "bg-slate-700" : "bg-white"
      } cursor-pointer drop-shadow-xl`}
      onClick={() => navigate(`/customer-info/${customer.id}`)}
    >
      <div className="flex items-center gap-2">
        <h1
          className={`${
            darkMode ? "bg-white text-slate-700" : "bg-slate-700 text-white"
          }  w-10 h-10 flex items-center justify-center font-Lemon  rounded-full`}
        >
          {customer.name.charAt(0)}
        </h1>
        <div>
          <h1
            className={`text-sm ${
              darkMode ? "text-white" : "text-black"
            } font-Poppins font-medium capitalize`}
          >
            {customer.name}
          </h1>
          {customer.interest > 0 && (
            <p
              className={`text-[12px] font-Poppins font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } `}
            >
              Interest - {customer.interest}%
            </p>
          )}
          <p
            className={`text-[12px] font-Poppins font-medium ${
              darkMode ? "text-gray-300" : "text-gray-500"
            } `}
          >
            {date}
          </p>
        </div>
      </div>
      <div className="text-right">
        <h1
          className={`text-base font-Poppins font-semibold ${
            customer?.entries[0].balance.type === "Paid"
              ? "text-red-500"
              : customer?.entries[0].balance.type === "Got"
              ? "text-green-500"
              : "text-yellow-600"
          }`}
        >
          <IndianNumberFormat
            amount={customer?.entries[0].balance.totalAmount}
          />
        </h1>
        {customer?.interest > 0 && (
          <p
            className={`text-[12px] font-Poppins font-medium ${
              darkMode ? "text-slate-300" : "text-gray-500"
            }`}
          >
            ₹{Math.floor(interestAmountPerMonth)}/M
          </p>
        )}
        <p
          className={`text-[12px] font-Poppins font-semibold ${
            darkMode ? "text-slate-300" : "text-gray-500"
          }`}
        >
          {customer?.entries[0].balance.type === "Paid"
            ? "You'll Get"
            : customer?.entries[0].balance.type === "Got"
            ? "You'll Give"
            : "Balance Settled"}
        </p>
      </div>
    </div>
  );
};

const AllCustomers = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const { data: customerData, loading: customerLoading } =
    useQuery(ALL_CUSTOMERS);
  const customers = customerData?.customers;

  if (customerLoading) {
    return <Loading />;
  }
  return (
    <div className="overflow-hidden">
      <div
        className={`p-2 lg:w-1/4 ${
          darkMode ? "bg-slate-700" : "bg-white"
        } drop-shadow-xl flex items-center justify-between gap-10 fixed top-0 left-0 right-0 z-10`}
      >
        <IconButton onClick={() => navigate(-1)}>
          <i
            className={`fi fi-br-arrow-left pt-1 px-2 ${
              darkMode ? "text-white" : "text-slate-700"
            } `}
          ></i>
        </IconButton>
        <h1
          className={`text-xl font-Poppins font-semibold ${
            darkMode ? "text-white" : "text-slate-700"
          } capitalize`}
        >
          Customers
        </h1>
        <IconButton>
          <i
            className={`fi fi-br-sort-amount-down-alt pt-1 px-2 ${
              darkMode ? "text-white" : "text-slate-700"
            } `}
          ></i>
        </IconButton>
      </div>

      <div className={`py-20 p-5  ${darkMode ? "bg-slate-900" : ""}`}>
        {customers?.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center">
            <img src={empty} alt="" className="w-72" />
            <h1
              className={`font-Poppins ${
                darkMode ? "text-white" : "text-black"
              } font-semibold`}
            >
              No Customers
            </h1>
            <p
              className={`font-milk text-[12px] ${
                darkMode ? "text-slate-400" : "text-slate-600"
              } `}
            >
              Please add new customer
            </p>
          </div>
        )}

        {customers?.map((customer) => (
          <AllCustomerList
            key={customer.id}
            customer={customer}
            darkMode={darkMode}
          />
        ))}
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default AllCustomers;
