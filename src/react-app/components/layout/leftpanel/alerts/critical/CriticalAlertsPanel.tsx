interface CriticalAlertsPanelProps {
  theme?: "light" | "dark";
}

export function CriticalAlertsPanel({ theme = "dark" }: CriticalAlertsPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Critical Alerts</h3>
      <div className="text-sm">Security Alert in Mandera</div>
    </div>
  );
}