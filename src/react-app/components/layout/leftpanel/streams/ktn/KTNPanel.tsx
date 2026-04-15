interface KTNPanelProps {
  theme?: "light" | "dark";
}

export function KTNPanel({ theme = "dark" }: KTNPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">KTN News</h3>
      <div className="text-sm opacity-60">Live broadcast</div>
    </div>
  );
}