"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axios";

interface LocationSelectorProps {
  selectedCountry?: string | null;
  selectedCity?: string | null;
  onLocationChange?: (country: string | null, city: string | null) => void;
}

export default function LocationSelector({ selectedCountry = null, selectedCity = null, onLocationChange }: LocationSelectorProps) {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const url = selectedCountry ? `/dashboard/locations?country=${encodeURIComponent(selectedCountry)}` : "/dashboard/locations";
        const response = await axiosInstance.get(url);
        if (response.data.success) {
          // If a country is selected, don't overwrite the full list of countries.
          // The backend still returns the full list of countries, so it's safe to always update both.
          setCountries(response.data.data.countries || []);
          setCities(response.data.data.cities || []);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, [selectedCountry]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectCountry = (country: string | null) => {
    if (onLocationChange) onLocationChange(country, null);
    setIsCountryOpen(false);
  };

  const handleSelectCity = (city: string | null) => {
    if (onLocationChange) onLocationChange(selectedCountry, city);
    setIsCityOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Country Selector */}
      <div className="relative" ref={countryRef}>
        <button
          type="button"
          onClick={() => setIsCountryOpen(!isCountryOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
        >
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {selectedCountry || "Select Country"}
          </span>
          <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-200", isCountryOpen && "rotate-180")} />
        </button>

        {isCountryOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar px-1 py-1">
              <div 
                className={cn(
                  "mx-1 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors",
                  !selectedCountry ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => handleSelectCountry(null)}
              >
                All Countries
              </div>
              {countries.map((country) => (
                <div
                  key={country}
                  onClick={() => handleSelectCountry(country)}
                  className={cn(
                    "mx-1 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors flex items-center justify-between group",
                    selectedCountry === country 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {country}
                  {selectedCountry === country && <Check className="w-4 h-4" />}
                </div>
              ))}
              {countries.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No countries available
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* City Selector */}
      <div className="relative" ref={cityRef}>
        <button
          type="button"
          disabled={!selectedCountry}
          onClick={() => setIsCityOpen(!isCityOpen)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm transition-colors duration-200",
            !selectedCountry ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-gray-50"
          )}
        >
          <MapPin className={cn("w-4 h-4", !selectedCountry ? "text-gray-400" : "text-gray-500")} />
          <span className={cn("text-sm font-medium whitespace-nowrap", !selectedCountry ? "text-gray-400" : "text-gray-700")}>
            {!selectedCountry ? "Select Country First" : (selectedCity || "Select City")}
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", !selectedCountry ? "text-gray-300" : "text-gray-400", isCityOpen && "rotate-180")} />
        </button>

        {isCityOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar px-1 py-1">
              <div 
                className={cn(
                  "mx-1 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors",
                  !selectedCity ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => handleSelectCity(null)}
              >
                All Cities
              </div>
              {cities.map((city) => (
                <div
                  key={city}
                  onClick={() => handleSelectCity(city)}
                  className={cn(
                    "mx-1 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors flex items-center justify-between group",
                    selectedCity === city 
                      ? "bg-blue-50 text-blue-600 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {city}
                  {selectedCity === city && <Check className="w-4 h-4" />}
                </div>
              ))}
              {cities.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No cities available
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
