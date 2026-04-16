import { useState } from "react";
import { Search, Bell, Settings, User } from "lucide-react";

interface HeaderProps {
  theme?: "light" | "dark";
  onSearch?: (query: string) => void;
  onNotifications?: () => void;
  onSettings?: () => void;
  alertsCount?: number;
}

export function Header({
  theme = "dark",
  onSearch,
  onNotifications,
  onSettings,
  alertsCount = 0,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`h-14 px-4 flex items-center justify-between border-b ${
        theme === "dark"
          ? "bg-neutral-900 border-neutral-800"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">NS</span>
          </div>
          <span className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            NoSiasa
          </span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded ${theme === "dark" ? "bg-neutral-800 text-neutral-400" : "bg-gray-100 text-gray-500"}`}>
          Kenya Intel
        </span>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search counties..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${
              theme === "dark"
                ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
                : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onNotifications}
          className="relative p-2 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Bell className="w-5 h-5 text-neutral-400" />
          {alertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              {alertsCount > 9 ? "9+" : alertsCount}
            </span>
          )}
        </button>
        <button
          onClick={onSettings}
          className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Settings className="w-5 h-5 text-neutral-400" />
        </button>
        <button className="p-2 rounded-lg hover:bg-neutral-800 transition-colors">
          <User className="w-5 h-5 text-neutral-400" />
        </button>
      </div>
    </div>
  );
}
