
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin, ChevronDown } from "lucide-react";

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = [
  { code: "Pakistan", name: "Pakistan", currency: "PKR", flag: "🇵🇰" },
  { code: "UAE", name: "UAE", currency: "AED", flag: "🇦🇪" },
  { code: "UK", name: "United Kingdom", currency: "GBP", flag: "🇬🇧" },
  { code: "US", name: "United States", currency: "USD", flag: "🇺🇸" },
  { code: "Global", name: "Global", currency: "USD", flag: "🌍" },
];

export const RegionSelector = ({ selectedRegion, onRegionChange }: RegionSelectorProps) => {
  const currentRegion = regions.find(r => r.code === selectedRegion) || regions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span className="hidden sm:inline">{currentRegion.flag} {currentRegion.name}</span>
          <span className="sm:hidden">{currentRegion.flag}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {regions.map((region) => (
          <DropdownMenuItem
            key={region.code}
            onClick={() => onRegionChange(region.code)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <span>{region.flag}</span>
              <span>{region.name}</span>
            </div>
            <span className="text-sm text-gray-500">{region.currency}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
