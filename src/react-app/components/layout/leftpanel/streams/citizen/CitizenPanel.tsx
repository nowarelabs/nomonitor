interface CitizenPanelProps {
  theme?: "light" | "dark";
}

export function CitizenPanel({ theme = "dark" }: CitizenPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Citizen TV</h3>
      <div className="text-sm opacity-60">Live broadcast</div>
    </div>
  );
}