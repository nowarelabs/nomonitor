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

interface MapFlightsPanelProps {
  theme?: "light" | "dark";
  flights?: FlightData[];
  showFlightPaths?: boolean;
  selectedAirport?: string;
  onShowFlightPathsChange?: (show: boolean) => void;
  onAirportChange?: (airport: string) => void;
}

const AIRPORTS = [
  { code: "NBO", name: "Jomo Kenyatta (NBO)" },
  { code: "MBA", name: "Mombasa (MBA)" },
  { code: "WJR", name: "Wajir (WJR)" },
  { code: "KIS", name: "Kisumu (KIS)" },
];

export function MapFlightsPanel({ 
  theme = "dark", 
  flights = [],
  showFlightPaths = true,
  selectedAirport = "ALL",
  onShowFlightPathsChange,
  onAirportChange,
}: MapFlightsPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Flight Markers</h3>
      <div className="space-y-2 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={showFlightPaths} 
            onChange={(e) => onShowFlightPathsChange?.(e.target.checked)}
            className="w-4 h-4" 
          />
          <span className="text-sm">Show Flight Paths</span>
        </label>
      </div>
      <div className="space-y-2">
        <label className="text-xs opacity-60">Filter by Airport:</label>
        <select 
          value={selectedAirport} 
          onChange={(e) => onAirportChange?.(e.target.value)}
          className="w-full p-2 text-sm border rounded"
        >
          <option value="ALL">All Airports</option>
          {AIRPORTS.map(airport => (
            <option key={airport.code} value={airport.code}>{airport.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 text-xs opacity-60">
        Active flights: {flights.length}
      </div>
    </div>
  );
}