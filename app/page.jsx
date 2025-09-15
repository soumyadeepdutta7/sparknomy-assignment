import Dashboard from "../components/dashboard/Dashboard";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
