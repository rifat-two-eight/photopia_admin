"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const countries = [
  "Germany",
  "France",
  "United Kingdom",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Austria",
  "Portugal",
];

const cities = [
  "Berlin",
  "Paris",
  "London",
  "Glasgow",
  "Madrid",
  "Barcelona",
  "Rome",
  "Milan",
  "Amsterdam",
  "Brussels",
  "Zurich",
  "Vienna",
  "Lisbon",
];

export default function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (location: string) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
      >
        <MapPin className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {selectedLocation || "Select Location"}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {/* Countries Section */}
            <div className="px-1 py-1">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Select Country
              </h3>
              <div 
                className={cn(
                  "mx-1 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors",
                  selectedLocation === "All Countries" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => handleSelect("All Countries")}
              >
                All Countries
              </div>
              {countries.map((country) => (
                <div
                  key={country}
                  onClick={() => handleSelect(country)}
                  className={cn(
                    "mx-1 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors flex items-center justify-between group",
                    selectedLocation === country 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {country}
                  {selectedLocation === country && <Check className="w-4 h-4" />}
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-100 my-1 mx-2" />

            {/* Cities Section */}
            <div className="px-1 py-1">
              <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Select City
              </h3>
              <div 
                className={cn(
                  "mx-1 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors",
                  selectedLocation === "All Cities" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => handleSelect("All Cities")}
              >
                All Cities
              </div>
              {cities.map((city) => (
                <div
                  key={city}
                  onClick={() => handleSelect(city)}
                  className={cn(
                    "mx-1 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors flex items-center justify-between group",
                    selectedLocation === city 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {city}
                  {selectedLocation === city && <Check className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
