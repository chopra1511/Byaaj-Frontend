import { Button, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import InterestTracking from "../../components/utils/InterestTracking";
import { useQuery } from "@apollo/client";
import {
  GET_CUSTOMER,
  GET_ENTRIES,
  GET_TRACKING,
} from "../../queries/CustomerQueries";
import Loading from "../../components/utils/Loading";
import IndianNumberFormat from "../../components/utils/IndianNumberFormat";
import { DarkModeContext } from "../../components/utils/DarkModeContext";

const Extras = ({ icon, title, onOpen, showTrack, darkMode }) => {
  return (
    <div
      className={`flex flex-col items-center ${
        darkMode ? "text-slate-400" : "text-slate-700"
      }  cursor-pointer`}
      onClick={() => onOpen(!showTrack)}
    >
      <i className={`fi ${icon} text-2xl`}></i>
      <h1 className="text-[12px] font-Poppins font-medium">{title}</h1>
    </div>
  );
};

const CustomerInfo = () => {
  const { customerID } = useParams();
  const { darkMode } = useContext(DarkModeContext);
  
  const { data: customerData, loading: customerLoading } = useQuery(
    GET_CUSTOMER,
    { variables: { id: customerID } }
  );
  const customer = customerData?.customer;

  const { data: customerEntriesData, loading: customerEntriesLoading } =
    useQuery(GET_ENTRIES, {
      variables: { customerID: customerID },
    });
  const customerEntries = customerEntriesData?.entries;

  const { data: trackingData, loading: trackingLoading } = useQuery(
    GET_TRACKING,
    {
      variables: { customerID: customerID },
    }
  );

  const totalInterestPaid =
    trackingData?.customerInterestTracking?.totalInterestPaid || 0;

  const [showTrack, setShowTrack] = useState(false);
  const navigate = useNavigate();

  if (customerLoading || customerEntriesLoading || trackingLoading) {
    return <Loading />;
  }

  const handleNavigation = (type) => {
    navigate(`/add-entries/${customerID}`, {
      state: { type, name: customer?.name, darkMode },
    });
  };

  const date = customerEntries?.entries[0]?.date
    ? new Date(parseInt(customerEntries.entries[0].date)).toLocaleDateString(
        "en-US",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "No entries yet";

  let interestAmountPerMonth;
  if (customer?.interest > 0) {
    interestAmountPerMonth =
      (customer?.entries[0]?.balance?.totalAmount || 0) *
      (customer?.interest / 100);
  }

  const buttonStyles = {
    borderRadius: "10px",
    fontFamily: "Poppins",
    textTransform: "capitalize",
    fontSize: "16px",
    padding: "8px 24px",
  };

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
          {customer?.name}
        </h1>
        <IconButton onClick={() => navigate(`/customer-profile/${customerID}`)}>
          <i
            className={`fi fi-br-menu-dots-vertical pt-1 px-2 ${
              darkMode ? "text-white" : "text-slate-700"
            } `}
          ></i>
        </IconButton>
      </div>

      <div className={`pt-24 px-5 ${darkMode ? "bg-slate-900" : ""}`}>
        <div
          className={`${
            darkMode ? "bg-slate-700" : "bg-white"
          }  p-5 rounded-xl drop-shadow-xl`}
        >
          <div className="flex justify-between">
            <div>
              <h1
                className={`font-Poppins font-semibold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {customerEntries?.balance.type === "Paid" ? (
                  "You'll Get"
                ) : customerEntries?.balance.type === "Got" ? (
                  "You'll Give"
                ) : (
                  <span
                    className={`flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Balance Settled
                    <i className="fi fi-rr-face-awesome text-xl pt-1 text-green-600"></i>
                  </span>
                )}
              </h1>
              <h1
                className={`text-[12px] ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }  font-Poppins font-medium`}
              >
                {date}
              </h1>
            </div>
            <div className="text-right">
              <h1
                className={`text-lg font-Poppins ${
                  customerEntries?.balance.type === "Paid"
                    ? "text-red-500"
                    : customerEntries?.balance.type === "Got"
                    ? "text-green-500"
                    : ""
                } font-semibold`}
              >
                <IndianNumberFormat
                  amount={customerEntries.balance.totalAmount}
                />
              </h1>
              {customer?.interest > 0 && (
                <h1
                  className={`text-[12px] ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }  font-Poppins font-medium`}
                >
                  <span className="font-semibold text-yellow-500">
                    {customer?.interest}%
                  </span>{" "}
                  •{" "}
                  <span className="font-semibold text-green-500">
                    ₹{Math.floor(interestAmountPerMonth)}
                  </span>
                  /M
                </h1>
              )}
            </div>
          </div>
          <h1
            className={`mt-3 text-[12px] ${
              darkMode ? "text-slate-400" : "text-black"
            } text-center font-Poppins font-medium`}
          >
            Total Interest Paid :{" "}
            <span className="text-green-500">
              <IndianNumberFormat amount={Math.floor(totalInterestPaid)} />
            </span>
          </h1>
        </div>

        <div className="my-5 flex justify-evenly">
          <Extras
            icon={"fi-rr-calendar-clock"}
            title={"Interest"}
            onOpen={customer?.interest > 0 ? setShowTrack : null}
            showTrack={showTrack}
            darkMode={darkMode}
          />
          <Extras
            icon={"fi-rr-bell-ring"}
            title={"Reminders"}
            darkMode={darkMode}
          />
          <Extras
            icon={"fi-rr-comment-dots"}
            title={"SMS"}
            darkMode={darkMode}
          />
          <Extras
            icon={"fi-rr-file-pdf"}
            title={"Report"}
            darkMode={darkMode}
          />
        </div>

        <div className="my-5 overflow-y-scroll h-[23rem] pb-5 hide-scrollbar">
          {!showTrack && (
            <table className="w-full border-collapse">
              <thead
                className={`sticky top-0 ${
                  darkMode
                    ? "bg-slate-600 text-white"
                    : "bg-white text-slate-600"
                } drop-shadow-md`}
              >
                <tr className="text-[12px] font-Poppins">
                  <th className="px-2 py-2 text-left">Entries</th>
                  <th className="px-2 py-2 text-center">You Paid</th>
                  <th className="px-2 py-2 text-right">You Got</th>
                </tr>
              </thead>
              <tbody>
                {customerEntries?.entries
                  .slice()
                  .reverse()
                  .map((entry) => {
                    const formattedDate = new Date(
                      parseInt(entry?.date)
                    ).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    const formattedTime = new Date(
                      parseInt(entry?.date)
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    return (
                      <tr
                        key={entry.id}
                        className="border-b cursor-pointer"
                        onClick={() =>
                          navigate(`/edit-entries/${customerID}`, {
                            state: { entry,darkMode },
                          })
                        }
                      >
                        <td className="px-3 py-5 text-left text-[12px] font-Poppins">
                          <h1
                            className={`font-medium ${
                              darkMode ? "text-slate-400" : "text-slate-600"
                            }`}
                          >
                            {formattedDate} • {formattedTime}
                          </h1>
                          <p className={`text-slate-500`}>{entry.details}</p>
                        </td>
                        <td
                          className={`px-3 py-2 text-right ${
                            darkMode ? "bg-slate-800" : "bg-white"
                          } text-red-500 font-Poppins font-semibold`}
                        >
                          {entry.type === "Paid" ? (
                            <IndianNumberFormat amount={entry.amount} />
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="px-3 py-2 text-right text-green-500 font-Poppins font-semibold">
                          {entry.type === "Got" ? (
                            <IndianNumberFormat amount={entry.amount} />
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}

          {showTrack && (
            <InterestTracking
              onClose={setShowTrack}
              startDate={date}
              customerID={customerID}
              interest={interestAmountPerMonth}
              darkMode={darkMode}
            />
          )}
        </div>

        <div
          className={`w-full lg:w-1/4 p-5 flex gap-5 border-t ${
            darkMode ? "bg-slate-700 border-t-0" : "bg-white"
          }  fixed bottom-0 left-0 right-0`}
        >
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => handleNavigation("Paid")}
            sx={{ ...buttonStyles, backgroundColor: "#ef4444" }}
          >
            You Gave
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => handleNavigation("Got")}
            sx={{ ...buttonStyles, backgroundColor: "#22c55e" }}
          >
            You Got
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
