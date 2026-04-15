interface ProtestPanelProps {
  theme?: "light" | "dark";
}

export function ProtestPanel({ theme = "dark" }: ProtestPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Protests</h3>
      <div className="text-sm opacity-60">Protests data loading...</div>
    </div>
  );
}