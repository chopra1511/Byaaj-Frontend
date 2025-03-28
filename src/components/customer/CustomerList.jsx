import { useNavigate } from "react-router";
import IndianNumberFormat from "../utils/IndianNumberFormat";
import { useQuery } from "@apollo/client";
import { GET_ENTRIES } from "../../queries/CustomerQueries";
import empty from "../../assets/empty.png";

const CustomerListItem = ({ name, initial, customer,darkMode }) => {
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

  const navigate = useNavigate();
  return (
    <div
      className={`py-2 px-3 flex items-center justify-between border-b last:border-b-0 ${
        darkMode ? "bg-slate-700 border-slate-500" : "bg-white"
      } cursor-pointer hover:drop-shadow-md`}
      onClick={() => navigate(`/customer-info/${customer.id}`)}
    >
      <div className="flex items-center gap-2">
        <h1
          className={`${
            darkMode ? "bg-white text-slate-600" : "bg-slate-700 text-white"
          } w-10 h-10 flex items-center justify-center font-Lemon rounded-full`}
        >
          {initial}
        </h1>
        <div>
          <h1 className={`${darkMode ? "text-white" : "text-black"} text-sm font-Poppins font-medium capitalize`}>
            {name}
          </h1>
          <p className={`text-[12px] font-Poppins font-medium ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            {date}
          </p>
        </div>
      </div>
      <div className="text-right">
        <h1
          className={`text-sm font-Poppins font-semibold ${
            customer.entries[0].balance.type === "Paid"
              ? "text-red-500"
              : customer.entries[0].balance.type === "Got"
              ? "text-green-500"
              : "text-slate-700"
          }`}
        >
          <IndianNumberFormat
            amount={customer.entries[0].balance.totalAmount}
          />
        </h1>
        <p className={`text-[12px] font-Poppins font-medium ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          {customer.entries[0].balance.type === "Paid"
            ? "You'll Get"
            : customer.entries[0].balance.type === "Got"
            ? "You'll Give"
            : "Balance Settled"}
        </p>
      </div>
    </div>
  );
};

const CustomerList = ({ customers,darkMode }) => {
  return (
    <>
      {customers?.length === 0 && (
        <div className="flex flex-col items-center">
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
      <div
        className={`${customers ? "border-2" : ""}flex flex-col drop-shadow-xl`}
      >
        {customers &&
          customers?.map((customer) => (
            <CustomerListItem
              key={customer.id}
              name={customer.name}
              initial={customer.name.charAt(0)}
              customer={customer}
              darkMode={darkMode}
            />
          ))}
      </div>
    </>
  );
};

export default CustomerList;
