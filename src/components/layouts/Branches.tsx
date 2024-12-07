"use client";

import React, { useState, useEffect } from "react";
import { Branch } from "@/types/branch";
import { Input } from "../ui/input";
import BranchHero from "../ui/BranchHero";
import { getNearestBranch } from "@/lib/helpers";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);
import { useMap } from "react-leaflet";

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

const Branches = ({ branchData }: { branchData: BranchT[] }) => {
  // const [branches, setBranches] = useState<BranchT[]>(branchData);
  // const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Branch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    7.3775355, 3.9470396,
  ]);
  const [mapZoom, setMapZoom] = useState(16); // Increased default zoom
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );

  // Add function to calculate distance
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // useEffect(() => {
  //   const loadBranches = async () => {
  //     try {
  //       setIsLoading(true);
  //       const branchData = await getAllBranches();
  //       setBranches(branchData);
  //     } catch (error) {
  //       setError(
  //         error instanceof Error ? error.message : "Failed to load branches" window
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   loadBranches();
  // }, []);

  // Add useEffect for geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          // Find nearest branch to user's location
          if (branchData.length > 0) {
            const nearest = await getNearestBranch(
              latitude,
              longitude,
              branchData
            );
            const distance = calculateDistance(
              latitude,
              longitude,
              nearest.latitude,
              nearest.longitude
            );
            setSelectedLocation({ ...nearest, distance });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Keep default coordinates if geolocation fails window
        }
      );
    }
  }, [branchData]); // Add branches as dependency

  const searchLocation = async (query: string) => {
    setSearchInput(query);
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
    setIsLoading(false);
  };

  // Update handleLocationSelect to include distance calculation
  const handleLocationSelect = async (result: SearchResult) => {
    setSearchInput(result.display_name);
    setSearchResults([]);
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    setMapCenter([lat, lon]);
    setMapZoom(18); // Increased zoom level for street view
    const nearest = await getNearestBranch(lat, lon, branchData);
    const distance = calculateDistance(
      lat,
      lon,
      nearest.latitude,
      nearest.longitude
    );
    setSelectedLocation({ ...nearest, distance });
  };

  return (
    <div className="flex flex-col gsp-[1rem] lg:gap-[5rem]">
      <BranchHero />
      <div className="container mx-auto px-4 py-8">
        {/* {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )} */}

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-[350px,1fr] max-w-7xl w-full mx-auto items-start">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Search Section */}
            <div className="bg-white  rounded-lg ">
              <h2 className="text-xl font-semibold mb-4">Location Search</h2>
              <p className="text-gray-600 mb-4">
                Enter your town or area to find the nearest branch:
              </p>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g., Akure, Ondo, Nigeria"
                  className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-500"
                  value={searchInput}
                  onChange={(e) => searchLocation(e.target.value)}
                />

                {isLoading && (
                  <div className="absolute right-3 top-2">
                    <div className="animate-spin h-6 w-6 border-2 border-black rounded-full border-t-transparent"></div>
                  </div>
                )}

                {/* Update search results hover */}
                {searchResults.length > 0 && (
                  <div className="absolute w-full bg-white border rounded-lg mt-1 z-50 max-h-[300px] overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleLocationSelect(result)}
                      >
                        {result.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Update nearest branch card */}
              {selectedLocation && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-semibold text-black">
                    Nearest Branch Found!
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p className="font-medium text-gray-900">
                      {selectedLocation.name}
                    </p>
                    <p className="text-gray-600">{selectedLocation.address}</p>
                    <p className="text-sm text-gray-500">
                      Distance: {selectedLocation.distance?.toFixed(2)} km
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* All Branches List YOU */}
            <div className="bg-white  rounded-lg ">
              <h2 className="text-xl font-semibold mb-4">All Branches</h2>
              <div className="space-y-4">
                {branchData.map((branch) => (
                  <div
                    key={branch.id}
                    className=" rounded-lg border-b py-4  cursor-pointer transition-colors"
                    onClick={() => {
                      setMapCenter([branch.latitude, branch.longitude]);
                      setMapZoom(18); // Increased zoom level for street view
                      setSelectedLocation(branch);
                    }}
                  >
                    <h3 className="font-medium text-gray-900">{branch.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {branch.address}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Hours: {"Call for hours"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white sticky top-[10rem]  z-10 rounded-lg  h-[600px]">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Add user position marker */}
              {userPosition && (
                <Marker
                  position={userPosition}
                  icon={L.divIcon({
                    className: "custom-icon",
                    html: `<div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      You
                    </div>`,
                  })}
                >
                  <Popup>Your Location</Popup>
                </Marker>
              )}
              {/* Add path to nearest branch */}
              {userPosition && selectedLocation && (
                <Polyline
                  positions={[
                    userPosition,
                    [selectedLocation.latitude, selectedLocation.longitude],
                  ]}
                  color="blue"
                  weight={3}
                  opacity={0.7}
                  dashArray="10, 10"
                />
              )}
              {branchData.map((branch) => (
                <Marker
                  key={branch.id}
                  position={[branch.latitude, branch.longitude]}
                  icon={L.divIcon({
                    className: "custom-icon",
                    html: `<div class="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs">
                      ${branch.name}
                    </div>`,
                  })}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold">{branch.name}</h3>
                      <p>{branch.address}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {selectedLocation && (
                <SetViewOnSelect center={mapCenter} zoom={mapZoom} />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for updating map view
function SetViewOnSelect({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default Branches;
