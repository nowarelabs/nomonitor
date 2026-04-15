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
    html: `<div style="color: #3b82f6; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));">✈️</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const createSatelliteIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="color: #a855f7; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));">🛰️</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const createConflictIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: #dc2626; width: 12px; height: 12px; transform: rotate(45deg); border: 1px solid white;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
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
            <Marker key={`airport-${idx}`} position={[airport.lat, airport.lng]}>
              <Popup>
                <div className="text-gray-900">
                  <strong>{airport.name}</strong>
                </div>
              </Popup>
            </Marker>
          ))}

        {showPorts &&
          ports.map((port, idx) => (
            <Marker key={`port-${idx}`} position={[port.lat, port.lng]}>
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
              <div className="w-3 h-3 rotate-45 bg-red-600"></div>
              <span>Conflicts ({conflicts.length})</span>
            </div>
          )}
          {showFlights && flights.length > 0 && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <span className="text-xl">✈️</span>
              <span>Flights ({flights.length})</span>
            </div>
          )}
          {showSatellites && satellites.length > 0 && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <span className="text-xl">🛰️</span>
              <span>Satellites ({satellites.length})</span>
            </div>
          )}
          {showAirports && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <span className="text-xl">🛫</span>
              <span>Airports ({airports.length})</span>
            </div>
          )}
          {showPorts && (
            <div className={`flex items-center gap-2 text-xs ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}>
              <span className="text-xl">⚓</span>
              <span>Ports ({ports.length})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
