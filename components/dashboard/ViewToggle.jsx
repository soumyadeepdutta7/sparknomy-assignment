"use client"

const ViewToggle = ({ currentView, setCurrentView }) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 border">
      <div className="flex gap-1">
        <button
          onClick={() => setCurrentView("mobile")}
          className={`px-3 py-1 text-xs font-roboto rounded ${
            currentView === "mobile" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Mobile
        </button>
        <button
          onClick={() => setCurrentView("tablet")}
          className={`px-3 py-1 text-xs font-roboto rounded ${
            currentView === "tablet" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Tablet
        </button>
        <button
          onClick={() => setCurrentView("desktop")}
          className={`px-3 py-1 text-xs font-roboto rounded ${
            currentView === "desktop" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Desktop
        </button>
      </div>
    </div>
  )
}

export default ViewToggle
