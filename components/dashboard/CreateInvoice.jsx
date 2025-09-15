"use client";

const CreateInvoice = ({ currentView }) => {
  const getCardClasses = () => {
    switch (currentView) {
      case "mobile":
        return "rounded-3xl p-4 mb-4";
      case "tablet":
        return "rounded-2xl p-8 mb-6";
      case "desktop":
        return "rounded-2xl p-10 mb-8";
      default:
        return "rounded-2xl p-6 mb-4";
    }
  };

  return (
    <div>
      <div className={getCardClasses()} style={{ backgroundColor: "#F2F2F2" }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-[46px] mx-auto mb-4 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
            <img
              src="/invoice/Create.svg"
              alt="Add invoice icon"
              className="text-white"
            />
          </div>

          <h2
            className="text-xl font-semibold mb-2"
            style={{
              background: "linear-gradient(0deg, #334CCA, #9747FF, #DD2A7B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Create New Invoice
          </h2>
          <p className="text-[#999999] text-[12px]  ">
            Start by creating and sending new invoice
          </p>
        </div>
      </div>

      <p className="text-[12px] text-[#8134AF] text-center">
        Or Upload an existing invoice and set payment reminder
      </p>
    </div>
  );
};

export default CreateInvoice;
