interface CommPanelProps {
  theme?: "light" | "dark";
}

export function CommPanel({ theme = "dark" }: CommPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Communication</h3>
      <div className="text-sm opacity-60">No communication satellites in view</div>
    </div>
  );
}