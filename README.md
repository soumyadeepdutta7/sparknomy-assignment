# Sparkonomy Dashboard — Interview Assignment

A responsive financial dashboard built with **Next.js App Router**, featuring real-time data filtering, gradient UI, and hydration-safe rendering.

---

## 📁 Folder Structure

| Path                          | Description                         |
|-------------------------------|-------------------------------------|
| `src/app/page.jsx`            | Main entry → renders `<Dashboard />` |
| `src/components/dashboard/`   | Dashboard components folder         |
| ├── `Dashboard.jsx`           | Central state + layout              |
| ├── `TimePeriod.jsx`          | Gradient buttons + date picker      |
| ├── `EarningsCards.jsx`       | Stats summary                       |
| ├── `IncomeChart.jsx`         | Recharts visualization              |
| └── `InvoicesList.jsx`        | Dynamic list with status controls   |

    
## 🧰 Tech Used

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State**: React Hooks (`useState`, `useMemo`)
- **Charting**: Recharts
- **Toasts**: Sonner
- **Icons**: Inline SVG

---

## ✅ Key Best Practices

- 🛡️ **Hydration Safe**: Fixed `toLocaleString()` with `'en-US'` locale
- ⚡ **Optimized**: Used `useMemo` for derived data
- 🧱 **Central State**: All data flows from `Dashboard.jsx`
- 📱 **Responsive**: Mobile → Tablet → Desktop layouts
- 🎨 **Consistent UI**: Reusable styles, semantic colors, gradient text

---

✅ Ready for interview review. Clean, functional, and production-minded.
