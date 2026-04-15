interface ResourceConflictPanelProps {
  theme?: "light" | "dark";
}

export function ResourceConflictPanel({ theme = "dark" }: ResourceConflictPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Resource Conflicts</h3>
      <div className="text-sm opacity-60">Resource conflicts data loading...</div>
    </div>
  );
}