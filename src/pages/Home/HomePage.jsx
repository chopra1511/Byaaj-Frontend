import "@flaticon/flaticon-uicons/css/all/all.css";
import CustomerList from "../../components/customer/CustomerList";
import Footer from "../../components/Footer/Footer";
import CountUp from "react-countup";
import { Button } from "@mui/material";
import CustomerFormModal from "../../components/customer/CustomerFormModal";
import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_CUSTOMERS } from "../../queries/CustomerQueries";
import Loading from "../../components/utils/Loading";
import useBalanceTotals from "../../components/customHooks/useBalanceTotal";
import Filter from "../../components/Filter/Filter";
import MemoizedCountUp from "../../components/utils/MemoizedCountUp";
import { CURRENT_USER } from "../../queries/UserQueries";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openFilterModal, setFilterOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch current user
  const { data, loading:userLoading } = useQuery(CURRENT_USER); 

  const { data: customerData, loading: customerLoading } =
    useQuery(ALL_CUSTOMERS);
  const customers = customerData?.customers;

  const { paidTotal, gotTotal } = useBalanceTotals(customers);

  // **Filter customers based on search query**
  const filteredCustomers = customers?.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (customerLoading || userLoading) {
    return <Loading />;
  }
  return (
    <div className="p-5 overflow-hidden">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <i className="fi fi-rr-book-bookmark pt-1"></i>
          <h1 className="text-sm font-Poppins font-semibold">
            {data?.currentUser?.name}
          </h1>
          <i className="fi fi-br-angle-small-down pt-1 cursor-pointer"></i>
        </div>
        <i className="fi fi-rr-invite-alt pt-1 cursor-pointer"></i>
      </div>

      <div className=" bg-white drop-shadow-xl rounded-lg my-3">
        <div className=" flex items-center font-Poppins pt-5 border-b border-gray-200">
          <div className="w-1/2 text-center text-[12px] font-medium border-r border-gray-200 pb-2">
            <h1 className="text-gray-500">You'll Give</h1>
            <h1 className="text-green-500 text-lg font-semibold">
              ₹<MemoizedCountUp end={gotTotal} />
            </h1>
          </div>
          <div className="w-1/2 text-center text-[12px] font-medium pb-2">
            <h1 className="text-gray-500">You'll Get</h1>
            <h1 className="text-red-500 text-lg font-semibold">
              ₹<MemoizedCountUp end={paidTotal} />
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm font-Poppins font-medium outline-none"
            />
          </div>
          <div className="flex items-center gap-5">
            <i
              className="fi fi-rr-sort-amount-down-alt cursor-pointer"
              onClick={() => {
                setFilterOpenModal(true);
              }}
            ></i>
            <i className="fi fi-rr-file-pdf cursor-pointer"></i>
          </div>
        </div>
      </div>

      <div className="pb-5 h-96 overflow-y-scroll hide-scrollbar">
        <CustomerList customers={filteredCustomers} />
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
      {openFilterModal && <Filter onClose={setFilterOpenModal} />}
      <Footer />
    </div>
  );
};

export default HomePage;
