import { useMutation, useQuery } from "@apollo/client";
import { Button, CircularProgress, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { ALL_CUSTOMERS, GET_CUSTOMER } from "../../queries/CustomerQueries";
import { DELETE_CUSTOMER } from "../../mutations/CustomerMutations";
import Loading from "../../components/utils/Loading";
import { DarkModeContext } from "../../components/utils/DarkModeContext";

const CustomerSettings = () => {
  const navigate = useNavigate();
  const { customerID } = useParams();

  const { darkMode } = useContext(DarkModeContext);

  const { data: customerData, loading: customerLoading } = useQuery(
    GET_CUSTOMER,
    { variables: { id: customerID } }
  );
  const customer = customerData?.customer;

  const [deleteCustomer, { loading: deleteLoadin }] = useMutation(
    DELETE_CUSTOMER,
    {
      onCompleted: () => {
        navigate("/home");
      },
    }
  );

  const deleteHandler = () => {
    deleteCustomer({
      variables: { customerID: customerID },
      refetchQueries: [{ query: ALL_CUSTOMERS }],
    });
  };

  const buttonStyles = {
    borderRadius: "10px",
    fontFamily: "Poppins",
    textTransform: "capitalize",
    fontSize: "16px",
    padding: "8px 24px",
  };

  if (customerLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-hidden">
      <div
        className={`p-2 lg:w-1/4 ${
          darkMode ? "bg-slate-700" : "bg-white"
        } drop-shadow-xl flex items-center gap-10 fixed top-0 left-0 right-0 z-10`}
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
          Customer Profile
        </h1>
      </div>

      <div className={`h-screen pt-20 p-5 ${darkMode ? "bg-slate-900" : ""}`}>
        <div className="pt-10 flex flex-col items-center">
          <i
            className={`fi fi-rr-circle-user text-8xl ${
              darkMode ? "text-slate-400" : "text-slate-700"
            } `}
          ></i>

          <div className="w-full mt-5 flex flex-col gap-5">
            <div
              className={`flex items-center gap-5 border-2 ${
                darkMode ? "border-slate-400" : "border-slate-600"
              } py-2 px-3 rounded-xl`}
            >
              <i
                className={`fi fi-br-user text-xl ${
                  darkMode ? "text-slate-400" : "text-slate-700"
                }`}
              ></i>
              <div>
                <h1
                  className={`text-[12px] font-Poppins ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  } `}
                >
                  Name
                </h1>
                <h1
                  className={`text-xl ${
                    darkMode ? "text-white" : "text-black"
                  } capitalize font-Poppins font-semibold`}
                >
                  {customer?.name}
                </h1>
              </div>
            </div>

            <div
              className={`flex items-center gap-5 border-2 ${
                darkMode ? "border-slate-400" : "border-slate-600"
              } py-2 px-3 rounded-xl`}
            >
              <i
                className={`fi fi-br-phone-flip text-xl ${
                  darkMode ? "text-slate-400" : "text-slate-700"
                }`}
              ></i>
              <div>
                <h1
                  className={`text-[12px] font-Poppins ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  } `}
                >
                  Mobile Number
                </h1>
                <h1
                  className={`text-xl ${
                    darkMode ? "text-white" : "text-black"
                  } capitalize font-Poppins font-semibold`}
                >
                  {customer?.phone}
                </h1>
              </div>
            </div>
          </div>

          <div className="lg:w-1/4 fixed bottom-5 left-5 right-5">
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={deleteHandler}
              sx={{ ...buttonStyles, backgroundColor: "#ef4444" }}
            >
              {deleteLoadin ? (
                <CircularProgress size={"30px"} color="white" />
              ) : (
                "Delete Customer"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSettings;
