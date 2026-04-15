interface NavigationNavPanelProps {
  theme?: "light" | "dark";
}

export function NavigationNavPanel({ theme = "dark" }: NavigationNavPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Navigation</h3>
      <div className="text-sm opacity-60">No navigation satellites visible</div>
    </div>
  );
}
