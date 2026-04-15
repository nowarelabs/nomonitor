interface MarketsPanelProps {
  theme?: "light" | "dark";
}

export function MarketsPanel({ theme = "dark" }: MarketsPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Markets</h3>
      <div className="text-sm opacity-60">Market data loading...</div>
    </div>
  );
}