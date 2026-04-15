import { useState, useEffect } from "react";
import { Header, Sidebar, StatsCards, KenyaMap, FlightTracker, SatelliteTracker, LiveStreams, EconomicIndicators, ConflictStream, AlertsPanel, OSINTData } from "./index";

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

interface DashboardProps {
  theme?: "light" | "dark";
}

const mockAlerts: Alert[] = [
  { id: "1", title: "Security Alert in Mandera", severity: "critical", lat: 4.2312, lng: 40.867 },
  { id: "2", title: "Weather Warning in Western Kenya", severity: "high", lat: 0.5634, lng: 34.7518 },
  { id: "3", title: "Health Alert in Homa Bay", severity: "high", lat: -0.5273, lng: 34.4571 },
  { id: "4", title: "Traffic Advisory in Machakos", severity: "medium", lat: -1.1569, lng: 37.0742 },
];

const mockConflicts: Conflict[] = [
  { id: "1", title: "Pastoralist Conflict in Marsabit", type: "tribal", lat: 2.6845, lng: 37.9895 },
  { id: "2", title: "Election-related Protests in Kisumu", type: "election", lat: -0.3917, lng: 34.7615 },
  { id: "3", title: "Land Dispute in Nakuru", type: "resource", lat: -0.4581, lng: 36.0527 },
];

const mockFlights: Flight[] = [
  { id: "1", callsign: "KQ100", airline: "Kenya Airways", lat: 1.2, lng: 38.5, altitude: 38000, speed: 485, heading: 315 },
  { id: "2", callsign: "JMB01", airline: "Jambojet", lat: -2.5, lng: 40.2, altitude: 28000, speed: 420, heading: 180 },
  { id: "3", callsign: "FY540", airline: "Fly540", lat: 0.5, lng: 35.2, altitude: 32000, speed: 445, heading: 270 },
];

const mockSatellites: Satellite[] = [
  { id: "1", name: "Landsat 8", lat: 1.2345, lng: 36.789 },
  { id: "2", name: "Sentinel-2A", lat: -0.5678, lng: 37.456 },
  { id: "3", name: "ISS", lat: 0.1234, lng: 38.901 },
];

export function Dashboard({ theme = "dark" }: DashboardProps) {
  const [activePanel, setActivePanel] = useState("map");
  const [showCounties, setShowCounties] = useState(true);
  const [showAirports, setShowAirports] = useState(true);
  const [showPorts, setShowPorts] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [showConflicts, setShowConflicts] = useState(true);
  const [showFlights, setShowFlights] = useState(true);
  const [showSatellites, setShowSatellites] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const renderPanel = () => {
    switch (activePanel) {
      case "map":
        return (
          <KenyaMap
            theme={theme}
            alerts={mockAlerts}
            conflicts={mockConflicts}
            flights={mockFlights}
            satellites={mockSatellites}
            showCounties={showCounties}
            showAirports={showAirports}
            showPorts={showPorts}
            showAlerts={showAlerts}
            showConflicts={showConflicts}
            showFlights={showFlights}
            showSatellites={showSatellites}
          />
        );
      case "flights":
        return <FlightTracker theme={theme} />;
      case "satellites":
        return <SatelliteTracker theme={theme} />;
      case "streams":
        return <LiveStreams theme={theme} />;
      case "economic":
        return <EconomicIndicators theme={theme} />;
      case "conflicts":
        return <ConflictStream theme={theme} />;
      case "alerts":
        return <AlertsPanel theme={theme} />;
      case "osint":
        return <OSINTData theme={theme} />;
      default:
        return (
          <KenyaMap
            theme={theme}
            alerts={mockAlerts}
            conflicts={mockConflicts}
            flights={mockFlights}
            satellites={mockSatellites}
            showCounties={showCounties}
            showAirports={showAirports}
            showPorts={showPorts}
            showAlerts={showAlerts}
            showConflicts={showConflicts}
            showFlights={showFlights}
            showSatellites={showSatellites}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme === "dark" ? "bg-neutral-950" : "bg-gray-50"}`}>
      <Header
        theme={theme}
        onSearch={setSearchQuery}
        alertsCount={mockAlerts.length}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          theme={theme}
          onToggleCounties={setShowCounties}
          onToggleAirports={setShowAirports}
          onTogglePorts={setShowPorts}
          onToggleAlerts={setShowAlerts}
          onToggleConflicts={setShowConflicts}
          onToggleFlights={setShowFlights}
          onToggleSatellites={setShowSatellites}
          showCounties={showCounties}
          showAirports={showAirports}
          showPorts={showPorts}
          showAlerts={showAlerts}
          showConflicts={showConflicts}
          showFlights={showFlights}
          showSatellites={showSatellites}
          alertsCount={mockAlerts.length}
          conflictsCount={mockConflicts.length}
          flightsCount={mockFlights.length}
          satellitesCount={mockSatellites.length}
          activePanel={activePanel}
          onPanelChange={setActivePanel}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-neutral-800">
            <StatsCards theme={theme} />
          </div>
          
          <div className="flex-1 overflow-hidden">
            {renderPanel()}
          </div>
        </div>
      </div>
    </div>
  );
}
