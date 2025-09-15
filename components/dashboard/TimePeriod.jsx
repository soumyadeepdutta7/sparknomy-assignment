"use client";

import { useState } from "react";
import { toast } from "sonner";

const TimePeriod = ({
  currentView,
  activePeriod,
  onPeriodChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handlePeriodClick = (period) => {
    onPeriodChange(period);
    setShowCalendar(false);
    toast.info(`Selected ${period.replace(/([A-Z])/g, " $1").trim()}`);
  };

  const handleCustomClick = () => {
    onPeriodChange("Custom");
    setShowCalendar(true);
    toast.info("Custom date picker opened");
  };

  const handleDateSelect = () => {
    if (startDate && endDate) {
      toast.info(`Selected dates: ${startDate} - ${endDate}`);
      setShowCalendar(false);
    }
  };

  const getSpacing = () => {
    switch (currentView) {
      case "mobile":
        return "mb-6";
      case "tablet":
        return "mb-8";
      case "desktop":
        return "mb-10";
      default:
        return "mb-6";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}:${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}:${date.getFullYear()}`;
  };

  return (
    <div className={getSpacing()}>
      <div className="border-[2px] border-[#F2F2F2] rounded-[16px] p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#999999] text-[14px] font-[500]">Time Period</h3>
          <div className="text-[12px] font-[400] text-[#999999] font-roboto">
            {activePeriod === "Custom" && startDate && endDate
              ? `${formatDate(startDate)} - ${formatDate(endDate)}`
              : "dd:mm:yyyy - dd:mm:yyyy"}
          </div>
        </div>

        <div className="flex gap-[8px] mb-[8px]">
          {/* 1 Month Button */}
          <button
            onClick={() => handlePeriodClick("1Month")}
            className={`px-[14px] py-[4px] rounded-full text-[14px] transition-colors ${
              activePeriod === "1Month"
                ? "border border-[#F3E8FF] bg-[#f5f5f5]"
                : "border border-[#F2F2F2] text-[#999999] hover:bg-gray-200"
            }`}
            style={
              activePeriod === "1Month"
                ? {
                    background:
                      "linear-gradient(159.79deg, rgba(221, 42, 123, 0.05) -5.47%, rgba(151, 71, 255, 0.05) 74.41%, rgba(51, 76, 202, 0.05) 147%)",
                  }
                : {}
            }
          >
            <span
              className={
                activePeriod === "1Month" ? "text-transparent bg-clip-text" : ""
              }
              style={
                activePeriod === "1Month"
                  ? {
                      backgroundImage:
                        "linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : {}
              }
            >
              1Month
            </span>
          </button>

          {/* 3 Months Button */}
          <button
            onClick={() => handlePeriodClick("3Months")}
            className={`px-[14px] py-[4px] rounded-full text-[14px] transition-colors ${
              activePeriod === "3Months"
                ? "border border-[#F3E8FF] bg-[#f5f5f5]"
                : "border border-[#F2F2F2] text-[#999999] hover:bg-gray-200"
            }`}
            style={
              activePeriod === "3Months"
                ? {
                    background:
                      "linear-gradient(159.79deg, rgba(221, 42, 123, 0.05) -5.47%, rgba(151, 71, 255, 0.05) 74.41%, rgba(51, 76, 202, 0.05) 147%)",
                  }
                : {}
            }
          >
            <span
              className={
                activePeriod === "3Months"
                  ? "text-transparent bg-clip-text"
                  : ""
              }
              style={
                activePeriod === "3Months"
                  ? {
                      backgroundImage:
                        "linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : {}
              }
            >
              3Months
            </span>
          </button>

          {/* 1 Year Button */}
          <button
            onClick={() => handlePeriodClick("1Year")}
            className={`px-[14px] py-[4px] rounded-full text-[14px] flex items-center gap-[8px] transition-colors ${
              activePeriod === "1Year"
                ? "border border-[#F3E8FF] bg-[#f5f5f5]"
                : "border border-[#F2F2F2] text-[#999999] hover:bg-gray-200"
            }`}
            style={
              activePeriod === "1Year"
                ? {
                    background:
                      "linear-gradient(159.79deg, rgba(221, 42, 123, 0.05) -5.47%, rgba(151, 71, 255, 0.05) 74.41%, rgba(51, 76, 202, 0.05) 147%)",
                  }
                : {}
            }
          >
            <span
              className={
                activePeriod === "1Year" ? "text-transparent bg-clip-text" : ""
              }
              style={
                activePeriod === "1Year"
                  ? {
                      backgroundImage:
                        "linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : {}
              }
            >
              1Year
            </span>
            <img
              src="/time-period/Crown.svg"
              alt="crown icon"
              className="w-4 h-4"
            />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={handleCustomClick}
            className={`px-[14px] py-[4px] rounded-full text-[14px] flex items-center gap-[8px] transition-colors ${
              activePeriod === "Custom"
                ? "border border-[#F3E8FF] bg-[#f5f5f5]"
                : "border border-[#F2F2F2] text-[#999999] hover:bg-gray-200"
            }`}
            style={
              activePeriod === "Custom"
                ? {
                    background:
                      "linear-gradient(159.79deg, rgba(221, 42, 123, 0.05) -5.47%, rgba(151, 71, 255, 0.05) 74.41%, rgba(51, 76, 202, 0.05) 147%)",
                  }
                : {}
            }
          >
            <img
              src="/time-period/Calendar.svg"
              alt="calendar icon"
              className="w-4 h-4"
            />
            <span
              className={
                activePeriod === "Custom" ? "text-transparent bg-clip-text" : ""
              }
              style={
                activePeriod === "Custom"
                  ? {
                      backgroundImage:
                        "linear-gradient(169.7deg, #DD2A7B 1.49%, #9747FF 42.07%, #334CCA 99.84%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : {}
              }
            >
              Custom
            </span>
          </button>

          {showCalendar && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-80">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex gap-2 justify-end mt-2">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDateSelect}
                    disabled={!startDate || !endDate}
                    className="px-3 py-1 text-sm text-white bg-[#8134AF] rounded-md hover:bg-[#6b2a91] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimePeriod;
