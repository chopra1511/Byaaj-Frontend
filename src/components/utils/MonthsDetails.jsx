import React from "react";
import IndianNumberFormat from "./IndianNumberFormat";
import Loading from "./Loading";

const MonthsDetails = ({ tracking, darkMode }) => {
  const getDate = (timeStamp) => {
    const date = new Date(timeStamp);

    const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    const formattedDate = date.toLocaleDateString("en-GB", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return [formattedDate, formattedTime];
  };

  return (
    <>
      <div className="mt-5">
        <h2
          className={`font-Poppins ${
            darkMode ? "text-white" : "text-black"
          } font-semibold`}
        >
          Tracking Details
        </h2>
      </div>
      <div className="my-5 overflow-y-scroll h-[23rem] pb-5 hide-scrollbar">
        {tracking
          .slice()
          .reverse()
          .map((data) => {
            return (
              <table key={data.year} className="w-full border-collapse">
                <thead>
                  <tr
                    className={`text-sm font-Poppins ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <th className="px-2 py-2 text-left">Year: {data.year}</th>
                  </tr>
                </thead>
                <thead
                  className={`sticky top-0 ${
                    darkMode
                      ? "bg-slate-700 text-white"
                      : "bg-white text-slate-600"
                  } drop-shadow-md`}
                >
                  <tr className="text-[12px] font-Poppins">
                    <th className="px-2 py-2 text-left">Entries</th>
                    <th className="px-2 py-2 text-center">Interest Paid</th>
                    <th className="px-2 py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.months
                    .slice()
                    .reverse()
                    .map((month, index) => {
                      if (month.status === "Paid") {
                        const [formattedDate, formattedTime] = getDate(
                          Number(month.paidDate)
                        );
                        return (
                          <tr key={index} className="border-b cursor-pointer">
                            <td className="px-3 py-3 text-left text-[12px] font-Poppins">
                              <h1
                                className={`font-medium ${
                                  darkMode ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                {formattedDate} • {formattedTime}
                              </h1>
                              <p
                                className={`${
                                  darkMode ? "text-slate-400" : "text-slate-600"
                                }`}
                              ></p>
                            </td>
                            <td
                              className={`px-3 text-right text-sm ${
                                darkMode ? "bg-slate-800" : "bg-white"
                              } text-green-500 font-Poppins font-semibold`}
                            >
                              <IndianNumberFormat amount={month.interestAmt} />
                            </td>
                            <td className="px-3 text-right text-sm text-green-500 font-Poppins font-semibold">
                              {month.status}
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            );
          })}
      </div>
    </>
  );
};

export default MonthsDetails;
