interface HighAlertsPanelProps {
  theme?: "light" | "dark";
}

export function HighAlertsPanel({ theme = "dark" }: HighAlertsPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">High Alerts</h3>
      <div className="text-sm">Weather Warning in Western</div>
    </div>
  );
}