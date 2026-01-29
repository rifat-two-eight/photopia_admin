"use client";

import { useState } from "react";
import { Star, ChevronDown, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const rankingData = [
  {
    rank: 1,
    provider: "Elite Photography Studio",
    country: "Germany",
    revenue: "€48,500",
    bookings: 142,
    rating: 4.9,
  },
  {
    rank: 2,
    provider: "Creative Lens Co.",
    country: "France",
    revenue: "€42,300",
    bookings: 128,
    rating: 4.8,
  },
  {
    rank: 3,
    provider: "Moment Capture Pro",
    country: "United Kingdom",
    revenue: "€38,700",
    bookings: 115,
    rating: 4.9,
  },
  {
    rank: 4,
    provider: "Vision Arts Studio",
    country: "Spain",
    revenue: "€35,200",
    bookings: 98,
    rating: 4.7,
  },
  {
    rank: 5,
    provider: "Perfect Shot Photography",
    country: "Italy",
    revenue: "€32,800",
    bookings: 94,
    rating: 4.8,
  },
  {
    rank: 6,
    provider: "Snapshot Specialists",
    country: "Netherlands",
    revenue: "€29,600",
    bookings: 87,
    rating: 4.6,
  },
  {
    rank: 7,
    provider: "Light & Shadow Studio",
    country: "Germany",
    revenue: "€27,400",
    bookings: 81,
    rating: 4.7,
  },
  {
    rank: 8,
    provider: "Artistic Vision Pro",
    country: "United Kingdom",
    revenue: "€25,900",
    bookings: 76,
    rating: 4.8,
  },
  {
    rank: 9,
    provider: "Focus Point Studios",
    country: "Spain",
    revenue: "€24,100",
    bookings: 72,
    rating: 4.5,
  },
  {
    rank: 10,
    provider: "Pixel Perfect Photography",
    country: "France",
    revenue: "€22,800",
    bookings: 68,
    rating: 4.7,
  },
];

const filters = ["All Providers", "By Country", "By City", "By Category"];
const uniqueCountries = Array.from(new Set(rankingData.map(d => d.country)));

export default function TopPerformingProviders() {
  const [activeFilter, setActiveFilter] = useState("By Country");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredData = rankingData.filter((item) => {
    if (selectedCountry && item.country !== selectedCountry) return false;
    return true;
  });

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const selectCountry = (country: string | null) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <Card className="border-none shadow-sm ring-1 ring-gray-100">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Top Performing Providers
          </CardTitle>
          <p className="text-sm text-gray-500">View ranking by different criteria</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all",
                  activeFilter === filter
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex-1"></div>

          <div className="relative">
            <button 
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
                {selectedCountry || "All Countries"}
                <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isDropdownOpen && "rotate-180")} />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <div 
                        className={cn(
                            "px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center justify-between",
                            !selectedCountry && "bg-blue-50 text-blue-600"
                        )}
                        onClick={() => selectCountry(null)}
                    >
                        All Countries
                        {!selectedCountry && <Check className="w-4 h-4" />}
                    </div>
                    {uniqueCountries.map(country => (
                        <div 
                            key={country}
                            className={cn(
                                "px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center justify-between",
                                selectedCountry === country && "bg-blue-50 text-blue-600"
                            )}
                            onClick={() => selectCountry(country)}
                        >
                            {country}
                            {selectedCountry === country && <Check className="w-4 h-4" />}
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="text-right py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="text-right py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="text-right py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                    <tr
                    key={item.rank}
                    className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                    >
                    <td className="py-4 px-4 text-sm font-medium text-gray-500">
                        #{item.rank}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {item.provider}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                        {item.country}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900 text-right">
                        {item.revenue}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 text-right">
                        {item.bookings}
                    </td>
                    <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-gray-900">
                            {item.rating}
                        </span>
                        </div>
                    </td>
                    </tr>
                ))
              ) : (
                <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">
                        No providers found for the selected country.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
