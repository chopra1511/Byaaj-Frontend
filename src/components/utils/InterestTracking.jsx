import { useMutation, useQuery } from "@apollo/client";
import { GET_TRACKING } from "../../queries/CustomerQueries";
import { INTEREST_TRACKING } from "../../mutations/CustomerMutations";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MonthsDetails from "./MonthsDetails";
import { useState } from "react";

const InterestTracking = ({ startDate, customerID, interest }) => {
  // 1. Fetch the tracking data from server
  const { data, loading, error } = useQuery(GET_TRACKING, {
    variables: { customerID },
  });

  // 2. Set up the mutation to update tracking
  const [updateInterestTracking] = useMutation(INTEREST_TRACKING);

  // 3. If data is still loading or error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading tracking data</p>;

  // 4. Extract tracking info from the server response
  const tracking = data?.customerInterestTracking?.tracking || [];
  // e.g. tracking = [{ year: 2025, months: [ ... ] }, { year: 2026, ... }]

  //Check if any month is "Paid"
  const anyMonthPaid = tracking.some((yearData) =>
    yearData.months.some((m) => m.status === "Paid")
  );

  // 5. Toggle month status
  const toggleMonthStatus = (year, month, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Paid" : "Pending";
    const date = new Date();

    updateInterestTracking({
      variables: {
        customerID,
        year: parseInt(year, 10),
        month,
        interestAmt: interest, // or some logic to determine interest
        status: newStatus,
        paidDate: date,
      },
      // Re-run the GET_TRACKING query so we see updated data
      refetchQueries: [{ query: GET_TRACKING, variables: { customerID } }],
    }).catch((err) => {
      console.error("Error updating tracking:", err);
    });
  };

  return (
    <div className="w-full mx-auto mt-5 font-Poppins text-center">
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        className="w-full max-w-3xl"
      >
        {tracking.map((yearData) => (
          <SwiperSlide key={yearData.year} style={{ width: "280px" }}>
            <div className="bg-gray-50 border border-gray-300 rounded-lg drop-shadow-lg p-4 w-full">
              <div className="calendar-header bg-white pb-2 flex items-center justify-center gap-2">
                <i className="fi fi-rr-daily-calendar text-2xl pt-1"></i>
                <h1 className="text-xl font-Poppins font-semibold text-slate-700">
                  {yearData.year}
                </h1>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {yearData.months.map((m) => (
                  <div
                    key={m.month}
                    onClick={() => {
                      toggleMonthStatus(yearData.year, m.month, m.status);
                    }}
                    className={`cursor-pointer py-4 border flex flex-col items-center justify-center transition-colors
                      ${
                        m.status === "Pending"
                          ? "bg-red-100 border-red-300 hover:bg-red-200"
                          : "bg-green-100 border-green-300 hover:bg-green-200"
                      }`}
                  >
                    <span className="font-Poppins text-slate-700 text-sm font-semibold">
                      {m.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {anyMonthPaid && (
        <div>
          <MonthsDetails tracking={tracking} />
        </div>
      )}
    </div>
  );
};

export default InterestTracking;
