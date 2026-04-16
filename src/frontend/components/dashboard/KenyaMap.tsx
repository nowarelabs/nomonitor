import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Alert {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  lat: number;
  lng: number;
}

interface Conflict {
  id: string;
  title: string;
  type: string;
  lat: number;
  lng: number;
}

interface Flight {
  id: string;
  callsign: string;
  airline: string;
  lat: number;
  lng: number;
  altitude: number;
  speed: number;
  heading: number;
}

interface Satellite {
  id: string;
  name: string;
  lat: number;
  lng: number;
}



const severityColors: Record<string, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#22d3ee",
  low: "#22c55e",
};

const createAlertIcon = (severity: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${severityColors[severity]}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const createFlightIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" color="#3b82f6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const createSatelliteIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const createConflictIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const createAirportIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/></svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const createPortIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><path d="M3 21c3 0 6-3 6-6 0-4-6-6-6-6 0 0-3 3-3 6 0 3 3 6 3 6z"/><path d="M3 21c3 0 6 3 6-6 0-4-6-6-6-6 0 0-3 3-3 6 0 3 3 6 3 6z"/><line x1="12" y1="9" x2="12" y2="21"/></svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

interface KenyaMapProps {
  theme?: "light" | "dark";
  alerts?: Alert[];
  conflicts?: Conflict[];
  flights?: Flight[];
  satellites?: Satellite[];
  showCounties?: boolean;
  showAirports?: boolean;
  showPorts?: boolean;
  showAlerts?: boolean;
  showConflicts?: boolean;
  showFlights?: boolean;
  showSatellites?: boolean;
}

export function KenyaMap({
  theme = "dark",
  alerts = [],
  conflicts = [],
  flights = [],
  satellites = [],
  showCounties: _showCounties = true,
  showAirports = true,
  showPorts = true,
  showAlerts = true,
  showConflicts = true,
  showFlights = true,
  showSatellites = true,
}: KenyaMapProps) {
  const [_selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [_selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [_selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null);

  const kenyaCenter: [number, number] = [0.0236, 37.9062];

  const airports = [
    { name: "Jomo Kenyatta International", lat: -1.3192, lng: 36.9278 },
    { name: "Moi International", lat: -4.0348, lng: 39.5961 },
    { name: "Wilson Airport", lat: -1.3219, lng: 36.8144 },
    { name: "Kisumu Airport", lat: -0.0869, lng: 34.7389 },
    { name: "Eldoret International", lat: 0.4025, lng: 35.2858 },
  ];

  const ports = [
    { name: "Mombasa Port", lat: -4.0626, lng: 39.6299 },
    { name: "Kisumu Port", lat: -0.1037, lng: 34.7615 },
    { name: "Lamu Port", lat: -2.2686, lng: 40.8539 },
  ];

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={kenyaCenter}
        zoom={6}
        className="w-full h-full"
        style={{ background: theme === "dark" ? "#0f172a" : "#f8fafc" }}
      >
        <TileLayer
          url={theme === "dark" 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {showAirports &&
          airports.map((airport, idx) => (
            <Marker key={`airport-${idx}`} position={[airport.lat, airport.lng]} icon={createAirportIcon()}>
              <Popup>
                <div className="text-gray-900">
                  <strong>{airport.name}</strong>
                </div>
              </Popup>
            </Marker>
          ))}

        {showPorts &&
          ports.map((port, idx) => (
            <Marker key={`port-${idx}`} position={[port.lat, port.lng]} icon={createPortIcon()}>
              <Popup>
                <div className="text-gray-900">
                  <strong>{port.name}</strong>
                </div>
              </Popup>
            </Marker>
          ))}

        {showAlerts &&
          alerts.map((alert) => (
            <Marker
              key={alert.id}
              position={[alert.lat, alert.lng]}
              icon={createAlertIcon(alert.severity)}
              eventHandlers={{
                click: () => setSelectedAlert(alert),
              }}
            >
              <Popup>
                <div className="text-gray-900">
                  <strong>{alert.title}</strong>
                  <br />
                  Severity: {alert.severity}
                </div>
              </Popup>
            </Marker>
          ))}

        {showConflicts &&
          conflicts.map((conflict) => (
            <Marker
              key={conflict.id}
              position={[conflict.lat, conflict.lng]}
              icon={createConflictIcon()}
            >
              <Popup>
                <div className="text-gray-900">
                  <strong>{conflict.title}</strong>
                  <br />
                  Type: {conflict.type}
                </div>
              </Popup>
            </Marker>
          ))}

        {showFlights &&
          flights
            .filter(f => f.lat != null && f.lng != null)
            .map((flight) => (
              <Marker
                key={flight.id}
                position={[flight.lat, flight.lng]}
                icon={createFlightIcon()}
                eventHandlers={{
                  click: () => setSelectedFlight(flight),
                }}
              >
                <Popup>
                  <div className="text-gray-900">
                    <strong>{flight.callsign}</strong>
                    <br />
                    {flight.airline}
                    <br />
                    Alt: {flight.altitude}ft | Speed: {flight.speed}kts
                  </div>
                </Popup>
              </Marker>
            ))}

        {showSatellites &&
          satellites.map((sat) => (
            <Marker
              key={sat.id}
              position={[sat.lat, sat.lng]}
              icon={createSatelliteIcon()}
              eventHandlers={{
                click: () => setSelectedSatellite(sat),
              }}
            >
              <Popup>
                <div className="text-gray-900">
                  <strong>{sat.name}</strong>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <div className={`absolute top-4 right-4 z-[1000] p-3 rounded-lg border ${theme === "dark" ? "bg-neutral-900/90 border-neutral-700" : "bg-white/90 border-gray-200"}`}>
        <div className={`text-xs ${theme === "dark" ? "text-neutral-400" : "text-gray-600"} mb-2`}>Map Layers</div>
        <div className="space-y-1">
          {showAlerts && alerts.length > 0 && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Alerts ({alerts.length})</span>
            </div>
          )}
          {showConflicts && conflicts.length > 0 && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
              <span>Conflicts ({conflicts.length})</span>
            </div>
          )}
          {showFlights && flights.length > 0 && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3b82f6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>Flights ({flights.length})</span>
            </div>
          )}
          {showSatellites && satellites.length > 0 && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>
              <span>Satellites ({satellites.length})</span>
            </div>
          )}
          {showAirports && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/></svg>
              <span>Airports ({airports.length})</span>
            </div>
          )}
          {showPorts && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><path d="M3 21c3 0 6-3 6-6 0-4-6-6-6-6 0 0-3 3-3 6 0 3 3 6 3 6z"/><path d="M3 21c3 0 6 3 6-6 0-4-6-6-6-6 0 0-3 3-3 6 0 3 3 6 3 6z"/><line x1="12" y1="9" x2="12" y2="21"/></svg>
              <span>Ports ({ports.length})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
