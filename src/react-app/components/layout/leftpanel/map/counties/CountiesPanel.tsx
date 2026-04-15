export function CountiesPanel() {
  const counties = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Malindi", "Kitale", "Garissa"];
  
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Counties</h3>
      <div className="space-y-2">
        {counties.map((county) => (
          <label key={county} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm">{county}</span>
          </label>
        ))}
      </div>
    </div>
  );
}