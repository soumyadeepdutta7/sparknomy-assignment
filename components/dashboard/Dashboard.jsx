"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "./Header";
import CreateInvoice from "./CreateInvoice";
import TimePeriod from "./TimePeriod";
import EarningsCards from "./EarningsCards";
import IncomeChart from "./IncomeChart";
import InvoicesList from "./InvoicesList";
import ViewToggle from "./ViewToggle";
import { toast } from "sonner";
import axios from "axios";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("mobile");
  const [activePeriod, setActivePeriod] = useState("3Months");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      return invoices; // fallback
    }

    const end = activePeriod === "Custom" && endDate ? new Date(endDate) : now;

    return invoices.filter((inv) => {
      const invDate = new Date(inv.date);
      return invDate >= start && invDate <= end;
    });
  }, [activePeriod, startDate, endDate, invoices]);

  // 🎯 Recalculate earnings from filtered data
  const earnings = useMemo(() => {
    let total = 0;
    let awaited = 0;
    let overdue = 0;

    filteredInvoices.forEach((inv) => {
      const amount = inv.amount;
      total += amount;
      if (
        inv.status === "awaited" ||
        inv.status === "unpaid" ||
        inv.status === null
      )
        awaited += amount;
      if (inv.status === "overdue") overdue += amount;
    });

    return { total, awaited, overdue };
  }, [filteredInvoices]);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://68ca7f27430c4476c349b61c.mockapi.io/api/v1/invoices"
        );

        // Transform API data to match component's expected structure
        const transformedInvoices = response.data.map((invoice) => ({
          id: invoice.id,
          client: invoice.client_name,
          amount: invoice.due_amount,
          date: invoice.due_date.split("T")[0], // Extract just the date part
          status: invoice.status || "unpaid", // Handle null status
        }));

        setInvoices(transformedInvoices);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load invoices");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

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
        // keys for comparison
        const keyA = Object.keys(monthly).find((key) => monthly[key] === a);
        const keyB = Object.keys(monthly).find((key) => monthly[key] === b);

        if (!keyA || !keyB) return 0;

        const [yearA, monthA] = keyA.split("-");
        const [yearB, monthB] = keyB.split("-");
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

  // Add loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Add error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p>Error loading invoices: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

          <TimePeriod
            currentView={currentView}
            activePeriod={activePeriod}
            onPeriodChange={setActivePeriod}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          <EarningsCards
            currentView={currentView}
            totalEarnings={earnings.total}
            paymentAwaited={earnings.awaited}
            paymentOverdue={earnings.overdue}
          />

          <IncomeChart currentView={currentView} chartData={chartData} />

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
