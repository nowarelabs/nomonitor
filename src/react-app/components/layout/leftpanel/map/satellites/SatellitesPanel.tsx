interface SatellitesPanelProps {
  theme?: "light" | "dark";
}

export function SatellitesPanel({ theme = "dark" }: SatellitesPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Satellite Markers</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          <span className="text-sm">Show Satellite Tracks</span>
        </label>
      </div>
    </div>
  );
}
