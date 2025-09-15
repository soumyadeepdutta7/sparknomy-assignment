"use client"

import { useState, useEffect } from "react"

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant = "default" }) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, title, description, variant }

    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return { toast, toasts }
}

export const Toaster = () => {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handleToast = (event) => {
      const { title, description, variant } = event.detail
      const id = Math.random().toString(36).substr(2, 9)
      const newToast = { id, title, description, variant }

      setToasts((prev) => [...prev, newToast])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    }

    window.addEventListener("show-toast", handleToast)
    return () => window.removeEventListener("show-toast", handleToast)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right-full
            ${
              toast.variant === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : toast.variant === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-white border-gray-200 text-gray-800"
            }
          `}
        >
          <div className="font-medium text-sm">{toast.title}</div>
          {toast.description && <div className="text-xs opacity-80 mt-1">{toast.description}</div>}
        </div>
      ))}
    </div>
  )
}

export const showToast = (title, description, variant = "default") => {
  window.dispatchEvent(
    new CustomEvent("show-toast", {
      detail: { title, description, variant },
    }),
  )
}
