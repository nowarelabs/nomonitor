interface KenyaMapPanelProps {
  theme?: "light" | "dark";
}

export function KenyaMapPanel({ theme = "dark" }: KenyaMapPanelProps) {
  const isDark = theme === "dark";
  return (
    <div className="p-4">
      <h3 className={`text-sm font-medium mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Kenya Map</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isDark ? "text-neutral-300" : "text-gray-700"}`}>Show Counties</span>
          <input type="checkbox" defaultChecked className="w-4 h-4" />
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isDark ? "text-neutral-300" : "text-gray-700"}`}>Show Borders</span>
          <input type="checkbox" defaultChecked className="w-4 h-4" />
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isDark ? "text-neutral-300" : "text-gray-700"}`}>Show Labels</span>
          <input type="checkbox" defaultChecked className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}