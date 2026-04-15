interface EconomicOSINTPanelProps {
  theme?: "light" | "dark";
}

export function EconomicOSINTPanel({ theme = "dark" }: EconomicOSINTPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Economic Reports</h3>
      <div className="text-sm opacity-60">Economic reports loading...</div>
    </div>
  );
}