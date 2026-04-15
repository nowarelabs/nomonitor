interface RightMapControlsPanelProps {
  theme?: "light" | "dark";
}

export function RightMapControlsPanel({ theme: _theme = "dark" }: RightMapControlsPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Map Controls</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Zoom Level</span>
          <span className="text-sm font-medium">100%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Center</span>
          <span className="text-sm font-medium">0.0, 38.0</span>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          <span className="text-sm">Auto Refresh</span>
        </div>
      </div>
    </div>
  );
}