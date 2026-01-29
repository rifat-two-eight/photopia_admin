"use client";

import { useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const allRankingData = [
  {
    country: "Germany",
    revenue: "€397,855",
    growth: "+8.3%",
    rankJan2026: "1st",
    rankDec2025: "1st",
    rankNov2025: "1st",
  },
  {
    country: "France",
    revenue: "€541,112",
    growth: "+13.9%",
    rankJan2026: "2nd",
    rankDec2025: "1st",
    rankNov2025: "1st",
  },
  {
    country: "United Kingdom",
    revenue: "€117,369",
    growth: "+21.1%",
    rankJan2026: "3rd",
    rankDec2025: "1st",
    rankNov2025: "7th",
  },
  {
    country: "Spain",
    revenue: "€102,100",
    growth: "+15.4%",
    rankJan2026: "4th",
    rankDec2025: "2nd",
    rankNov2025: "3rd",
  },
  {
    country: "Italy",
    revenue: "€95,540",
    growth: "+10.2%",
    rankJan2026: "5th",
    rankDec2025: "4th",
    rankNov2025: "6th",
  },
  {
    country: "Netherlands",
    revenue: "€88,200",
    growth: "+7.5%",
    rankJan2026: "6th",
    rankDec2025: "5th",
    rankNov2025: "5th",
  },
  {
    country: "Belgium",
    revenue: "€76,400",
    growth: "+5.1%",
    rankJan2026: "7th",
    rankDec2025: "6th",
    rankNov2025: "8th",
  },
];

const uniqueCountries = Array.from(new Set(allRankingData.map(d => d.country)));

export default function CountryRanking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredData = allRankingData.filter((item) => {
    const matchesSearch = item.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry ? item.country === selectedCountry : true;
    return matchesSearch && matchesCountry;
  });

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const selectCountry = (country: string | null) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <Card className="border-none shadow-sm ring-1 ring-gray-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-gray-900">Country Ranking</CardTitle>
          <p className="text-sm text-gray-500">
            Top countries by revenue and growth
          </p>
        </div>
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
      </CardHeader>
      
      <CardContent>
        <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  Country
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  Revenue
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  Growth
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                  Rank January 2026
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                  Rank December 2025
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                  Rank November 2025
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {item.country}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                        {item.revenue}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-emerald-500">
                        {item.growth}
                    </td>
                    <td className="py-4 px-4 text-sm text-center text-gray-600">
                        {item.rankJan2026}
                    </td>
                    <td className="py-4 px-4 text-sm text-center text-gray-600">
                        {item.rankDec2025}
                    </td>
                    <td className="py-4 px-4 text-sm text-center text-gray-500">
                        {item.rankNov2025}
                    </td>
                    </tr>
                ))
              ) : (
                <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">
                        No results found for your search.
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
