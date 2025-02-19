import "@flaticon/flaticon-uicons/css/all/all.css";
import CustomerList from "../../components/customer/CustomerList";
import Footer from "../../components/Footer/Footer";
import CountUp from "react-countup";
import { Button } from "@mui/material";
import CustomerFormModal from "../../components/customer/CustomerFormModal";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_CUSTOMERS } from "../../queries/CustomerQueries";
import Loading from "../../components/utils/Loading";
import useBalanceTotals from "../../components/customHooks/useBalanceTotal";
import IndianNumberFormat from "../../components/utils/IndianNumberFormat";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: customerData, loading: customerLoading } =
    useQuery(ALL_CUSTOMERS);
  const customers = customerData?.customers;

  const { paidTotal, gotTotal } = useBalanceTotals(customers);

  if (customerLoading) {
    return <Loading />;
  }
  return (
    <div className="p-5 overflow-hidden">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <i className="fi fi-rr-book-bookmark pt-1"></i>
          <h1 className="text-sm font-Poppins font-semibold">Rahul Chopra</h1>
          <i className="fi fi-br-angle-small-down pt-1 cursor-pointer"></i>
        </div>
        <i className="fi fi-rr-invite-alt pt-1 cursor-pointer"></i>
      </div>

      <div className=" bg-white drop-shadow-xl rounded-lg my-3">
        <div className=" flex items-center font-Poppins pt-5 border-b border-gray-200">
          <div className="w-1/2 text-center text-[12px] font-medium border-r border-gray-200 pb-2">
            <h1 className="text-gray-500">You'll Give</h1>
            <h1 className="text-green-500 text-lg font-semibold">
              ₹
              <CountUp
                end={gotTotal}
                duration={2} // Duration of animation in seconds
                separator=","
                formattingFn={(value) =>
                  new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 2,
                  }).format(value)
                }
              />
            </h1>
          </div>
          <div className="w-1/2 text-center text-[12px] font-medium pb-2">
            <h1 className="text-gray-500">You'll Get</h1>
            <h1 className="text-red-500 text-lg font-semibold">
              ₹
              <CountUp
                end={paidTotal}
                duration={2} // Duration of animation in seconds
                separator=","
                formattingFn={(value) =>
                  new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 2,
                  }).format(value)
                }
              />
            </h1>
          </div>
        </div>

        <div className="py-2  font-Poppins font-medium text-sm flex items-center justify-center gap-2 cursor-pointer">
          <h1>Report</h1>
          <i className="fi fi-br-angle-small-right pt-1"></i>
        </div>
      </div>

      <div className=" bg-white drop-shadow-xl rounded-lg my-3">
        <div className="py-2  font-Poppins font-medium text-sm flex items-center justify-center gap-2 cursor-pointer">
          <i className="fi fi-br-receipt pt-1"></i>
          <h1>Open Cashbook</h1>
        </div>
      </div>

      <div className="bg-white drop-shadow-xl rounded-lg my-3">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <i className="fi fi-br-search text-sm cursor-pointer"></i>
            <input
              type="text"
              placeholder="Search for customers"
              onChange={(e) => console.log(e.target.value)}
              className="text-sm font-Poppins font-medium outline-none"
            />
          </div>
          <div className="flex items-center gap-5">
            <i className="fi fi-rr-sort-amount-down-alt cursor-pointer"></i>
            <i className="fi fi-rr-file-pdf cursor-pointer"></i>
          </div>
        </div>
      </div>

      <div className="pb-5 h-96 overflow-y-scroll hide-scrollbar">
        <CustomerList customers={customers} />
      </div>

      <div className="fixed bottom-20 right-5">
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => setOpenModal(true)}
          sx={{
            borderRadius: 50,
            fontFamily: "Poppins",
            backgroundColor: "#334155",
            color: "white",
            fontSize: "16px",
            padding: "8px 24px",
          }}
        >
          <i className="fi fi-rr-user-add text-sm pt-1"></i>
          <span className="text-[12px] pl-2 font-Poppins"> Add Customer</span>
        </Button>
      </div>
      {openModal && <CustomerFormModal setOpenModal={setOpenModal} />}
      <Footer />
    </div>
  );
};

export default HomePage;
