interface AIAlertsPanelProps {
  theme?: "light" | "dark";
}

export function AIAlertsPanel({ theme = "dark" }: AIAlertsPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">AI Assistant</h3>
      <div className="text-xs opacity-60">Correlate alerts and predict incidents.</div>
    </div>
  );
}
