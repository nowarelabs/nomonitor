export function PortsPanel() {
  const ports = [
    { name: "Mombasa Port", type: "Seaport" },
    { name: "Lamu Port", type: "Seaport" },
    { name: "Kisumu Port", type: "Lake Port" },
  ];
  
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Ports</h3>
      <div className="space-y-2">
        {ports.map((port) => (
          <label key={port.name} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <div className="text-sm font-medium">{port.name}</div>
              <div className="text-xs opacity-60">{port.type}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}