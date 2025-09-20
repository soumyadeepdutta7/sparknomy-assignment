"use client";

import { useState } from "react";
import { toast } from "sonner";

const InvoicesList = ({ currentView, invoices = [] }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [invoiceStatuses, setInvoiceStatuses] = useState({});

  const getStatusColor = (status) => {
    switch (status) {
      case "disputed":
        return { backgroundColor: "#FFB1B1", color: "#FF2D55" };
      case "paid":
        return { backgroundColor: "#9CEFB8", color: "#34C759" };
      case "overdue":
        return { backgroundColor: "#FFB1B1", color: "#FF2D55" };
      case "draft":
      case "unpaid":
      case null: // Handle null status from API
        return { backgroundColor: "#F2F2F2", color: "#999999" };
      case "update status":
        return { backgroundColor: "#8134AF", color: "#FFFFFF" };
      case "awaited":
        return { backgroundColor: "#FFFAE5", color: "#FFCC00" };
      default:
        return { backgroundColor: "#F2F2F2", color: "#999999" };
    }
  };

  const getButtonDimensions = (status) => {
    switch (status) {
      case "paid":
        return { width: "54px", height: "32px" };
      case "disputed":
        return { width: "78px", height: "32px" };
      case "unpaid":
        return { width: "68px", height: "32px" };
      case "update status":
        return { width: "122px", height: "32px" };
      default:
        return { width: "auto", height: "32px" };
    }
  };

  // Update status options to match API possibilities
  const statusOptions = [
    "paid",
    "unpaid",
    "disputed",
    "overdue",
    "awaited",
    "draft"
  ];

  // Format status for display (capitalize first letter)
  const formatStatusForDisplay = (status) => {
    if (!status) return "Unpaid";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Get the display status - either from local state or the original invoice
  const getDisplayStatus = (invoice) => {
    return invoiceStatuses[invoice.id] || invoice.status || "unpaid";
  };

  const handleStatusClick = (status, invoiceId) => {
    // Show dropdown for "update status" or allow updating any status
    setOpenDropdown(openDropdown === invoiceId ? null : invoiceId);
  };

  const handleStatusChange = (invoiceId, newStatus) => {
    // Update local state
    setInvoiceStatuses((prev) => ({
      ...prev,
      [invoiceId]: newStatus,
    }));

    toast.success(`Status updated to: ${formatStatusForDisplay(newStatus)}`);
    setOpenDropdown(null);
  };

  const handleNotificationClick = (status) => {
    toast.warning(`${formatStatusForDisplay(status)} Notification Sent`);
  };

  const getGridClasses = () => {
    switch (currentView) {
      case "mobile":
        return "";
      case "tablet":
        return "grid grid-cols-2 gap-4";
      case "desktop":
        return "grid grid-cols-3 gap-4";
      default:
        return "";
    }
  };

  // Format currency for display
  const formatCurrency = (amount) => `$${amount.toLocaleString("en-US")}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-[600] text-[#999999]">Your Invoices</h3>
        <button className="flex items-center justify-center w-6 h-6 hover:bg-gray-100 rounded transition-colors">
          <img src="/list/pindown.svg" alt="pindown icon" />
        </button>
      </div>

      <div className={getGridClasses()}>
        {invoices.map((invoice) => {
          const displayStatus = getDisplayStatus(invoice);
          const formattedStatus = formatStatusForDisplay(displayStatus);
          
          return (
            <div
              key={invoice.id}
              className="relative mb-[10px] border-[2px] border-[#F2F2F2] rounded-[16px] px-[12px] py-[16px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-[500] text-[14px] text-[#6B7280]">
                    {invoice.client}
                  </p>
                  <p className="font-[400] text-[12px] text-[#999999]">
                    {formatCurrency(invoice.amount)}, Due: {invoice.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() =>
                        handleStatusClick(displayStatus, invoice.id)
                      }
                      className="flex items-center justify-center gap-1 hover:opacity-80 transition-opacity"
                      style={{
                        ...getStatusColor(displayStatus),
                        ...getButtonDimensions(displayStatus),
                        borderRadius: "24px",
                        paddingTop: "9px",
                        paddingRight: "15px",
                        paddingBottom: "9px",
                        paddingLeft: "15px",
                        fontFamily: "Roboto",
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight: "100%",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {formattedStatus}
                      {displayStatus === "update status" && (
                        <img src="/list/drop.svg" alt="dropdown icon" />
                      )}
                    </button>

                    {openDropdown === invoice.id && (
                      <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                        {statusOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              handleStatusChange(invoice.id, option)
                            }
                            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                            style={{
                              fontFamily: "Roboto",
                              fontWeight: 400,
                              fontSize: "12px",
                            }}
                          >
                            {formatStatusForDisplay(option)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {(displayStatus === "overdue" ||
                    displayStatus === "awaited") && (
                    <button
                      onClick={() => handleNotificationClick(displayStatus)}
                      className="w-4 h-4 hover:scale-110 transition-transform flex items-center justify-center"
                    >
                      <img src="/list/bell.svg" alt="bell icon" />
                    </button>
                  )}
                  {displayStatus === "draft" && (
                    <button className="w-4 h-4 hover:scale-110 transition-transform flex items-center justify-center">
                      <img src="/list/draft.svg" alt="draft icon" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvoicesList;