interface AIAssistantMapPanelProps {
  theme?: "light" | "dark";
}

export function AIAssistantMapPanel({ theme: _theme = "dark" }: AIAssistantMapPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">AI Assistant</h3>
      <div className="space-y-2">
        <div className="text-xs opacity-60">Ask about map data, counties, or generate reports.</div>
      </div>
    </div>
  );
}