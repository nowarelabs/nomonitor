interface MediumAlertsPanelProps {
  theme?: "light" | "dark";
}

export function MediumAlertsPanel({ theme = "dark" }: MediumAlertsPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Medium Alerts</h3>
      <div className="text-sm">Traffic Advisory in Machakos</div>
    </div>
  );
}