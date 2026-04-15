import { useState } from "react";
import {
  Map,
  Plane,
  Satellite,
  Radio,
  BarChart,
  AlertTriangle,
  Crosshair,
  FileText,
  Eye,
  EyeOff,
  ChevronRight,
  Info,
} from "lucide-react";

interface SidebarProps {
  theme?: "light" | "dark";
  onToggleCounties?: (show: boolean) => void;
  onToggleAirports?: (show: boolean) => void;
  onTogglePorts?: (show: boolean) => void;
  onToggleAlerts?: (show: boolean) => void;
  onToggleConflicts?: (show: boolean) => void;
  onToggleFlights?: (show: boolean) => void;
  onToggleSatellites?: (show: boolean) => void;
  showCounties?: boolean;
  showAirports?: boolean;
  showPorts?: boolean;
  showAlerts?: boolean;
  showConflicts?: boolean;
  showFlights?: boolean;
  showSatellites?: boolean;
  alertsCount?: number;
  conflictsCount?: number;
  flightsCount?: number;
  satellitesCount?: number;
  activePanel?: string;
  onPanelChange?: (panel: string) => void;
}

export function Sidebar({
  theme = "dark",
  onToggleCounties,
  onToggleAirports,
  onTogglePorts,
  onToggleAlerts,
  onToggleConflicts,
  onToggleFlights,
  onToggleSatellites,
  showCounties = true,
  showAirports = true,
  showPorts = true,
  showAlerts = true,
  showConflicts = true,
  showFlights = true,
  showSatellites = true,
  alertsCount = 0,
  conflictsCount = 0,
  flightsCount = 0,
  satellitesCount = 0,
  activePanel = "map",
  onPanelChange,
}: SidebarProps) {
  const layers = [
    {
      id: "counties",
      label: "Counties",
      icon: Map,
      enabled: showCounties,
      onToggle: () => onToggleCounties?.(!showCounties),
    },
    {
      id: "airports",
      label: "Airports",
      icon: Plane,
      enabled: showAirports,
      onToggle: () => onToggleAirports?.(!showAirports),
    },
    {
      id: "ports",
      label: "Ports",
      icon: Eye,
      enabled: showPorts,
      onToggle: () => onTogglePorts?.(!showPorts),
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: AlertTriangle,
      enabled: showAlerts,
      onToggle: () => onToggleAlerts?.(!showAlerts),
      count: alertsCount,
    },
    {
      id: "conflicts",
      label: "Conflicts",
      icon: Crosshair,
      enabled: showConflicts,
      onToggle: () => onToggleConflicts?.(!showConflicts),
      count: conflictsCount,
    },
    {
      id: "flights",
      label: "Flights",
      icon: Plane,
      enabled: showFlights,
      onToggle: () => onToggleFlights?.(!showFlights),
      count: flightsCount,
    },
    {
      id: "satellites",
      label: "Satellites",
      icon: Satellite,
      enabled: showSatellites,
      onToggle: () => onToggleSatellites?.(!showSatellites),
      count: satellitesCount,
    },
  ];

  const panels = [
    { id: "map", label: "Map", icon: Map },
    { id: "flights", label: "Flights", icon: Plane },
    { id: "satellites", label: "Satellites", icon: Satellite },
    { id: "streams", label: "Live Streams", icon: Radio },
    { id: "economic", label: "Economic", icon: BarChart },
    { id: "conflicts", label: "Conflicts", icon: Crosshair },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    { id: "osint", label: "OSINT", icon: FileText },
  ];

  return (
    <div
      className={`w-64 h-full border-r flex flex-col ${
        theme === "dark"
          ? "bg-neutral-900 border-neutral-800"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="p-3 border-b border-neutral-800">
        <div className="text-xs font-medium text-neutral-400 mb-2">PANELS</div>
        <div className="space-y-1">
          {panels.map((panel) => (
            <button
              key={panel.id}
              onClick={() => onPanelChange?.(panel.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activePanel === panel.id
                  ? "bg-blue-600 text-white"
                  : theme === "dark"
                  ? "text-neutral-300 hover:bg-neutral-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <panel.icon className="w-4 h-4" />
              <span>{panel.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-b border-neutral-800">
        <div className="text-xs font-medium text-neutral-400 mb-2">MAP LAYERS</div>
        <div className="space-y-2">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={`flex items-center justify-between p-2 rounded-lg ${
                theme === "dark" ? "bg-neutral-800" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <layer.icon className="w-4 h-4 text-neutral-400" />
                <span className="text-sm text-neutral-300">{layer.label}</span>
                {layer.count !== undefined && layer.count > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                    {layer.count}
                  </span>
                )}
              </div>
              <button
                onClick={layer.onToggle}
                className="p-1 rounded hover:bg-neutral-700 transition-colors"
              >
                {layer.enabled ? (
                  <Eye className="w-4 h-4 text-green-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-neutral-500" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 flex-1">
        <div className="text-xs font-medium text-neutral-400 mb-2">QUICK STATS</div>
        <div className="space-y-2">
          <div
            className={`p-2 rounded-lg ${
              theme === "dark" ? "bg-neutral-800" : "bg-gray-100"
            }`}
          >
            <div className="text-xs text-neutral-400">Active Alerts</div>
            <div className="text-lg font-semibold text-red-400">{alertsCount}</div>
          </div>
          <div
            className={`p-2 rounded-lg ${
              theme === "dark" ? "bg-neutral-800" : "bg-gray-100"
            }`}
          >
            <div className="text-xs text-neutral-400">Conflicts</div>
            <div className="text-lg font-semibold text-orange-400">{conflictsCount}</div>
          </div>
          <div
            className={`p-2 rounded-lg ${
              theme === "dark" ? "bg-neutral-800" : "bg-gray-100"
            }`}
          >
            <div className="text-xs text-neutral-400">Flights</div>
            <div className="text-lg font-semibold text-blue-400">{flightsCount}</div>
          </div>
          <div
            className={`p-2 rounded-lg ${
              theme === "dark" ? "bg-neutral-800" : "bg-gray-100"
            }`}
          >
            <div className="text-xs text-neutral-400">Satellites</div>
            <div className="text-lg font-semibold text-purple-400">{satellitesCount}</div>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-neutral-800">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Info className="w-4 h-4" />
          <span>Data refreshes every 30s</span>
        </div>
      </div>
    </div>
  );
}
