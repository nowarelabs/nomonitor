export function AirportsPanel() {
  const airports = [
    { code: "JKIA", name: "Jomo Kenyatta International" },
    { code: "MBA", name: "Mombasa Moi International" },
    { code: "KIS", name: "Kisumu International" },
    { code: "ELD", name: "Eldoret International" },
  ];
  
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Airports</h3>
      <div className="space-y-2">
        {airports.map((airport) => (
          <label key={airport.code} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <div className="text-sm font-medium">{airport.code}</div>
              <div className="text-xs opacity-60">{airport.name}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}