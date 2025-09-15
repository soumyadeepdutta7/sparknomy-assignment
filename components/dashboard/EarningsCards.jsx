"use client";

const EarningsCards = ({
  currentView,
  totalEarnings,
  paymentAwaited,
  paymentOverdue,
}) => {
  const getGridClasses = () => {
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

  const getCardClasses = () => {
    switch (currentView) {
      case "mobile":
        return "p-4 border-2 border-[#F2F2F2] rounded-[16px] mb-4";
      case "tablet":
        return "p-4 border-2 border-[#F2F2F2] rounded-[16px]";
      case "desktop":
        return "p-5 border-2 border-[#F2F2F2] rounded-[16px]";
      default:
        return "p-4 border-2 border-[#F2F2F2] rounded-[16px] mb-4";
    }
  };

  const getBottomRowClasses = () => {
    switch (currentView) {
      case "mobile":
        return "grid grid-cols-2 gap-4";
      case "tablet":
        return "grid grid-cols-2 gap-4";
      case "desktop":
        return "grid grid-cols-2 gap-6";
      default:
        return "grid grid-cols-2 gap-4";
    }
  };

  // Format currency
  const formatCurrency = (amount) => `$${amount.toLocaleString("en-US")}`;

  return (
    <div className={getGridClasses()}>
      {/* Total Earnings Card - Full Width */}
      <div className={getCardClasses()}>
        <h3 className="text-[#999999] font-[500] text-[14px] mb-1">
          Total Earnings
        </h3>
        <p className="text-[20px] font-[600] text-[#8134AF]">
          {formatCurrency(totalEarnings)}
        </p>
      </div>

      {/* Payment Awaited and Payment Overdue - Side by Side */}
      <div className={getBottomRowClasses()}>
        {/* Payment Awaited Card */}
        <div className={getCardClasses()}>
          <h3 className="text-[#999999] text-[14px] font-[500] mb-1">
            Payment Awaited
          </h3>
          <p className="text-[14px] font-[600] text-[#8134AF]">
            {formatCurrency(paymentAwaited)}
          </p>
        </div>

        {/* Payment Overdue Card */}
        <div className={getCardClasses()}>
          <h3 className="text-[#999999] text-[14px] font-[500] mb-1">
            Payment Overdue
          </h3>
          <p className="text-[14px] font-[600] text-[#8134AF]">
            {formatCurrency(paymentOverdue)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarningsCards;
