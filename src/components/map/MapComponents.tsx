import dynamic from "next/dynamic";

// Wrap the entire MapContainer component
export const MapContainer = dynamic(
  async () => {
    const { MapContainer } = await import('react-leaflet');
    return MapContainer;
  },
  { ssr: false }
);

// Wrap each component individually
export const TileLayer = dynamic(
  async () => {
    const { TileLayer } = await import('react-leaflet');
    return TileLayer;
  },
  { ssr: false }
);

export const Marker = dynamic(
  async () => {
    const { Marker } = await import('react-leaflet');
    return Marker;
  },
  { ssr: false }
);

export const Popup = dynamic(
  async () => {
    const { Popup } = await import('react-leaflet');
    return Popup;
  },
  { ssr: false }
);

export const Polyline = dynamic(
  async () => {
    const { Polyline } = await import('react-leaflet');
    return Polyline;
  },
  { ssr: false }
);