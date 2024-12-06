"use client";

import { useEffect, useState } from "react";
import { Branch } from "@/types/branch";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  branches: Branch[];
  selectedLocation: Branch | null;
  mapCenter: [number, number];
  mapZoom: number;
}

// Initialize Leaflet icons - IMPORTANT: This needs to be outside the component
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl: "/sermonhero-img.svg.png",
  iconSize: [35, 57],
  iconAnchor: [17, 57],
  popupAnchor: [1, -57],
  shadowUrl: "/marker-shadow.png",
  shadowSize: [41, 41],
});

const LeafletMap = ({ branches, selectedLocation, mapCenter, mapZoom }: LeafletMapProps) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [mapCenter, mapZoom]);

  return (
    <div className="h-[600px] lg:h-[calc(100vh-2rem)] rounded-lg overflow-hidden border lg:sticky lg:top-4">
      <MapContainer
        key={key}
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {branches.map((branch) => (
          <Marker
            key={branch.id}
            position={[branch.latitude, branch.longitude]}
          >
            <Popup>
              {branch.name}<br />{branch.address}
            </Popup>
          </Marker>
        ))}

        {selectedLocation && (
          <Marker
            key="selected"
            position={[selectedLocation.latitude, selectedLocation.longitude]}
            icon={customIcon}
            zIndexOffset={1000}
          >
            <Popup>
              <span className="text-lg font-bold text-black">Nearest Branch</span>
              <br />
              {selectedLocation.name}<br />
              {selectedLocation.address}<br />
              <span className="text-sm text-gray-600">
                Distance: {selectedLocation.distance?.toFixed(2)} km
              </span>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;