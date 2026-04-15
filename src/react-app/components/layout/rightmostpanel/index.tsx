import type { ReactNode } from "react";
import type { ViewMode } from "../EditorLayout";

import { AIAssistantMapPanel } from "./map/AIAssistantMapPanel";
import { AIFlightsPanel } from "./flights/AIFlightsPanel";
import { AISatellitesPanel } from "./satellites/AISatellitesPanel";
import { AIStreamsPanel } from "./streams/AIStreamsPanel";
import { AIEconomicPanel } from "./economic/AIEconomicPanel";
import { AIConflictsPanel } from "./conflicts/AIConflictsPanel";
import { AIAlertsPanel } from "./alerts/AIAlertsPanel";
import { AIOSINTPanel } from "./osint/AIOSINTPanel";

interface RightMostPanelProps {
  mode: ViewMode;
  theme?: "light" | "dark";
}

export function RightMostPanel({ mode, theme = "dark" }: RightMostPanelProps): ReactNode {
  if (mode === "map") return <AIAssistantMapPanel theme={theme} />;
  if (mode === "flights") return <AIFlightsPanel theme={theme} />;
  if (mode === "satellites") return <AISatellitesPanel theme={theme} />;
  if (mode === "streams") return <AIStreamsPanel theme={theme} />;
  if (mode === "economic") return <AIEconomicPanel theme={theme} />;
  if (mode === "conflicts") return <AIConflictsPanel theme={theme} />;
  if (mode === "alerts") return <AIAlertsPanel theme={theme} />;
  if (mode === "osint") return <AIOSINTPanel theme={theme} />;
  return null;
}