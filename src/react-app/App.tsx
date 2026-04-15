import { useState, useEffect } from "react";
import { EditorLayout } from "./components/layout";
import type { ViewMode } from "./components/layout";
import { 
  KenyaMap, 
  StatsCards, 
  FlightTracker, 
  SatelliteTracker, 
  LiveStreams, 
  EconomicIndicators, 
  ConflictStream, 
  AlertsPanel, 
  OSINTData 
} from "./components/dashboard";

interface FlightData {
  icao24: string;
  callsign: string;
  originCountry: string;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  heading: number;
  isArriving: boolean;
  isDeparting: boolean;
}

interface FlightsResponse {
  timestamp: number;
  total: number;
  flights: FlightData[];
}

interface AppProps {
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
}

const mockAlerts = [
  { id: "1", title: "Security Alert in Mandera", severity: "critical" as const, lat: 4.2312, lng: 40.867 },
  { id: "2", title: "Weather Warning in Western Kenya", severity: "high" as const, lat: 0.5634, lng: 34.7518 },
  { id: "3", title: "Health Alert in Homa Bay", severity: "high" as const, lat: -0.5273, lng: 34.4571 },
  { id: "4", title: "Traffic Advisory in Machakos", severity: "medium" as const, lat: -1.1569, lng: 37.0742 },
];

const mockConflicts = [
  { id: "1", title: "Pastoralist Conflict in Marsabit", type: "tribal", lat: 2.6845, lng: 37.9895 },
  { id: "2", title: "Election-related Protests in Kisumu", type: "election", lat: -0.3917, lng: 34.7615 },
  { id: "3", title: "Land Dispute in Nakuru", type: "resource", lat: -0.4581, lng: 36.0527 },
];

const mockSatellites = [
  { id: "1", name: "Landsat 8", lat: 1.2345, lng: 36.789 },
  { id: "2", name: "Sentinel-2A", lat: -0.5678, lng: 37.456 },
  { id: "3", name: "ISS", lat: 0.1234, lng: 38.901 },
];

const WORKER_URL = "http://localhost:8787";

export default function App({
  theme = "dark",
  onThemeChange,
}: AppProps = {}) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(theme);
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>("map");
  const [flights, setFlights] = useState<FlightData[]>([]);

  useEffect(() => {
    let mounted = true;

    async function fetchFlights() {
      try {
        const response = await fetch(`${WORKER_URL}/api/flights/all`);
        if (!response.ok) return;
        const data: FlightsResponse = await response.json();
        if (mounted) {
          setFlights(data.flights);
        }
      } catch (err) {
        console.error("Failed to fetch flights:", err);
      }
    }

    fetchFlights();
    const interval = setInterval(fetchFlights, 60000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setCurrentTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  const renderContent = () => {
    return (
      <div className="flex flex-col w-full h-full">
        <div className="p-3 border-b border-neutral-800">
          <StatsCards theme={currentTheme} />
        </div>
        <div className="flex-1 overflow-hidden">
          {currentViewMode === "map" && (
            <KenyaMap 
              theme={currentTheme}
              alerts={mockAlerts}
              conflicts={mockConflicts}
              flights={flights.map(f => ({
                id: f.icao24,
                callsign: f.callsign,
                airline: f.callsign.substring(0, 2),
                lat: f.latitude,
                lng: f.longitude,
                altitude: f.altitude,
                speed: f.velocity,
                heading: f.heading,
              }))}
              satellites={mockSatellites}
              showAlerts={true}
              showConflicts={true}
              showFlights={true}
              showSatellites={true}
            />
          )}
          {currentViewMode === "flights" && <FlightTracker theme={currentTheme} />}
          {currentViewMode === "satellites" && <SatelliteTracker theme={currentTheme} />}
          {currentViewMode === "streams" && <LiveStreams theme={currentTheme} />}
          {currentViewMode === "economic" && <EconomicIndicators theme={currentTheme} />}
          {currentViewMode === "conflicts" && <ConflictStream theme={currentTheme} />}
          {currentViewMode === "alerts" && <AlertsPanel theme={currentTheme} />}
          {currentViewMode === "osint" && <OSINTData theme={currentTheme} />}
        </div>
      </div>
    );
  };

  return (
    <div className={currentTheme}>
      <EditorLayout
        theme={currentTheme}
        onThemeChange={handleThemeChange}
        viewMode={currentViewMode}
        onSelectViewMode={setCurrentViewMode}
      >
        {renderContent()}
      </EditorLayout>
    </div>
  );
}