"use client"

import { useState, useEffect } from "react"
import { Package, DollarSign, MapPin, Megaphone } from "lucide-react"

export default function FourPContent() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading 4P data...</div>
      </div>
    )
  }

  const fourPData = {
    product: {
      icon: Package,
      title: "Product",
      description: "Product strategy and features"
    },
    price: {
      icon: DollarSign,
      title: "Price",
      description: "Pricing strategy and positioning"
    },
    place: {
      icon: MapPin,
      title: "Place",
      description: "Distribution channels and locations"
    },
    promotion: {
      icon: Megaphone,
      title: "Promotion",
      description: "Marketing and promotional activities"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">4P Analysis</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Marketing Mix Analysis - Product, Price, Place, Promotion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(fourPData).map(([key, item]) => {
          const Icon = item.icon
          return (
            <div
              key={key}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
