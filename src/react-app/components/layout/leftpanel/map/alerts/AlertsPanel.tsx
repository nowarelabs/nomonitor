export function MapAlertsPanel() {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Map Alerts</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          <span className="text-sm">Show Active Alerts</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          <span className="text-sm">Show Alert Categories</span>
        </label>
      </div>
    </div>
  );
}