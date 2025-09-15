"use client";

import { useState, useMemo } from "react";
import Header from "./Header";
import CreateInvoice from "./CreateInvoice";
import TimePeriod from "./TimePeriod";
import EarningsCards from "./EarningsCards";
import IncomeChart from "./IncomeChart";
import InvoicesList from "./InvoicesList";
import ViewToggle from "./ViewToggle";

// 🎯 Central Invoice Data — Realistic with dates and statuses
const ALL_INVOICES = [
  {
    id: 1,
    client: "Acme Corp",
    amount: 125000,
    date: "2025-06-15",
    status: "Paid",
  },
  {
    id: 2,
    client: "Beta LLC",
    amount: 85000,
    date: "2025-05-20",
    status: "Unpaid",
  },
  {
    id: 3,
    client: "Gamma Inc",
    amount: 200000,
    date: "2025-04-10",
    status: "Overdue",
  },
  {
    id: 4,
    client: "Delta Ltd",
    amount: 95000,
    date: "2025-03-05",
    status: "Paid",
  },
  {
    id: 5,
    client: "Echo Co",
    amount: 150000,
    date: "2025-02-18",
    status: "Partially Paid",
  },
  {
    id: 6,
    client: "Foxtrot",
    amount: 75000,
    date: "2025-01-30",
    status: "Awaited",
  },
  {
    id: 7,
    client: "Golf Inc",
    amount: 300000,
    date: "2025-12-15",
    status: "Disputed",
  },
  {
    id: 8,
    client: "Hotel LLC",
    amount: 110000,
    date: "2025-09-10",
    status: "Update Status",
  },
  {
    id: 9,
    client: "India Corp",
    amount: 180000,
    date: "2025-10-05",
    status: "Paid",
  },
  {
    id: 10,
    client: "Juliet",
    amount: 65000,
    date: "2025-09-12",
    status: "Overdue",
  },
  {
    id: 11,
    client: "Kilo Ltd",
    amount: 220000,
    date: "2025-08-30",
    status: "Paid",
  },
  {
    id: 12,
    client: "Lima Co",
    amount: 90000,
    date: "2025-07-17",
    status: "Unpaid",
  },
  {
    id: 13,
    client: "Mike Inc",
    amount: 135000,
    date: "2025-06-25",
    status: "Paid",
  },
  {
    id: 14,
    client: "November",
    amount: 170000,
    date: "2025-05-08",
    status: "Awaited",
  },
  {
    id: 15,
    client: "Oscar LLC",
    amount: 80000,
    date: "2025-04-14",
    status: "Disputed",
  },
  {
    id: 16,
    client: "Papa Corp",
    amount: 250000,
    date: "2025-03-22",
    status: "Paid",
  },
  {
    id: 17,
    client: "Quebec",
    amount: 140000,
    date: "2025-02-05",
    status: "Overdue",
  },
  {
    id: 18,
    client: "Romeo Inc",
    amount: 160000,
    date: "2025-01-18",
    status: "Partially Paid",
  },
  {
    id: 19,
    client: "Sierra",
    amount: 105000,
    date: "2025-12-30",
    status: "Paid",
  },
  {
    id: 20,
    client: "Tango Ltd",
    amount: 190000,
    date: "2025-11-10",
    status: "Unpaid",
  },
];

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("mobile");
  const [activePeriod, setActivePeriod] = useState("3Months");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🎯 Filter invoices based on selected period
  const filteredInvoices = useMemo(() => {
    const now = new Date();
    let start = new Date();

    if (activePeriod === "1Month") {
      start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    } else if (activePeriod === "3Months") {
      start = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    } else if (activePeriod === "1Year") {
      start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    } else if (activePeriod === "Custom" && startDate && endDate) {
      start = new Date(startDate);
    } else {
      return ALL_INVOICES; // fallback
    }

    const end = activePeriod === "Custom" && endDate ? new Date(endDate) : now;

    return ALL_INVOICES.filter((inv) => {
      const invDate = new Date(inv.date);
      return invDate >= start && invDate <= end;
    });
  }, [activePeriod, startDate, endDate]);

  // 🎯 Recalculate earnings from filtered data
  const earnings = useMemo(() => {
    let total = 0;
    let awaited = 0;
    let overdue = 0;

    filteredInvoices.forEach((inv) => {
      const amount = inv.amount;
      total += amount;
      if (inv.status === "Awaited" || inv.status === "Unpaid")
        awaited += amount;
      if (inv.status === "Overdue") overdue += amount;
    });

    return { total, awaited, overdue };
  }, [filteredInvoices]);

  // 🎯 Generate chart data from filtered invoices (group by month)
  const chartData = useMemo(() => {
    const monthly = {};
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    filteredInvoices.forEach((inv) => {
      const d = new Date(inv.date);
      const monthKey = `${d.getFullYear()}-${d.getMonth()}`;
      const monthName = monthNames[d.getMonth()];

      if (!monthly[monthKey]) {
        monthly[monthKey] = { month: monthName, income: 0, count: 0 };
      }

      monthly[monthKey].income += inv.amount;
      monthly[monthKey].count++;
    });

    // Convert to array and sort by date
    const data = Object.values(monthly)
      .sort((a, b) => {
        const [yearA, monthA] = Object.keys(monthly)
          .find((key) => monthly[key] === a)
          .split("-");
        const [yearB, monthB] = Object.keys(monthly)
          .find((key) => monthly[key] === b)
          .split("-");
        return new Date(yearA, monthA) - new Date(yearB, monthB);
      })
      .slice(-6); // Last 6 months

    // Add MoM growth
    return data.map((item, index, arr) => {
      if (index === 0) {
        return { ...item, momGrowth: 0 };
      } else {
        const prev = arr[index - 1].income;
        const growth =
          prev === 0 ? 0 : Math.round(((item.income - prev) / prev) * 100);
        return { ...item, momGrowth: growth };
      }
    });
  }, [filteredInvoices]);

  const getContainerClasses = () => {
    switch (currentView) {
      case "mobile":
        return "w-full max-w-[390px] mx-auto bg-white min-h-screen relative";
      case "tablet":
        return "w-full max-w-2xl mx-auto bg-white min-h-screen px-6 relative";
      case "desktop":
        return "w-full bg-white min-h-screen px-8 relative";
      default:
        return "w-full max-w-[375px] mx-auto bg-white min-h-screen relative";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ViewToggle currentView={currentView} setCurrentView={setCurrentView} />

      <div
        className={getContainerClasses()}
        style={{ backgroundColor: "#E8CDE6" }}
      >
        <Header currentView={currentView} />

        <div className="px-4 pb-6 space-y-6 rounded-t-[46px] px-[16px] pt-[22px] bg-white">
          <CreateInvoice currentView={currentView} />

          {/* ✅ Pass down state setters and values */}
          <TimePeriod
            currentView={currentView}
            activePeriod={activePeriod}
            onPeriodChange={setActivePeriod}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          {/* ✅ Pass calculated earnings */}
          <EarningsCards
            currentView={currentView}
            totalEarnings={earnings.total}
            paymentAwaited={earnings.awaited}
            paymentOverdue={earnings.overdue}
          />

          {/* ✅ Pass filtered chart data */}
          <IncomeChart currentView={currentView} chartData={chartData} />

          {/* ✅ Pass filtered invoices */}
          <InvoicesList currentView={currentView} invoices={filteredInvoices} />

          <div className="text-center mt-8 mb-4 pt-8 border-t border-gray-100">
            <div className="flex flex-col items-center justify-center space-y-2">
              <img
                src="/Sparkonomy.svg"
                alt="Sparkonomy Logo"
                className="w-32 h-auto"
              />
              <p className="text-gray-400 text-sm font-roboto">
                sparking the modern economy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
