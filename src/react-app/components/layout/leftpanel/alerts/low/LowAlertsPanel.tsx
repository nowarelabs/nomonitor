interface LowAlertsPanelProps {
  theme?: "light" | "dark";
}

export function LowAlertsPanel({ theme = "dark" }: LowAlertsPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Low Alerts</h3>
      <div className="text-sm opacity-60">No low priority alerts</div>
    </div>
  );
}