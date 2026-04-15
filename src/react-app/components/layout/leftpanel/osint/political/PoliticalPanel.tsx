interface PoliticalPanelProps {
  theme?: "light" | "dark";
}

export function PoliticalPanel({ theme = "dark" }: PoliticalPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Political Reports</h3>
      <div className="text-sm opacity-60">Political reports loading...</div>
    </div>
  );
}