interface ArmedPanelProps {
  theme?: "light" | "dark";
}

export function ArmedPanel({ theme = "dark" }: ArmedPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Armed Conflicts</h3>
      <div className="text-sm opacity-60">No active armed conflicts</div>
    </div>
  );
}