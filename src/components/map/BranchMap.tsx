
'use client';

import { Branch } from "@/types/branch";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "./MapComponents";
import { DivIcon } from "leaflet";
import { useMap } from "react-leaflet";

interface BranchMapProps {
  mapCenter: [number, number];
  mapZoom: number;
  userPosition: [number, number] | null;
  userIcon: DivIcon | null;
  selectedLocation: Branch | null;
  branchData: Branch[];
  customIcon: ((branch: Branch) => DivIcon) | null;
}

function BranchMap({
  mapCenter,
  mapZoom,
  userPosition,
  userIcon,
  selectedLocation,
  branchData,
  customIcon,
}: BranchMapProps) {
  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userPosition && userIcon && (
        <Marker position={userPosition} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}
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
          icon={customIcon ? customIcon(branch) : undefined}
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
  );
}

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

export default BranchMap;