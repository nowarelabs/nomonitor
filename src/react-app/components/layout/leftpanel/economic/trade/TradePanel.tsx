interface TradePanelProps {
  theme?: "light" | "dark";
}

export function TradePanel({ theme = "dark" }: TradePanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Trade</h3>
      <div className="text-sm opacity-60">Trade data loading...</div>
    </div>
  );
}