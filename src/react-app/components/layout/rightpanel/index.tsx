import type { ReactNode } from "react";
import type { ViewMode } from "../EditorLayout";

import { RightMapControlsPanel } from "./map/RightMapControlsPanel";
import { FlightDetailsPanel } from "./flights/FlightDetailsPanel";
import { SatelliteDetailsPanel } from "./satellites/SatelliteDetailsPanel";
import { StreamInfoPanel } from "./streams/StreamInfoPanel";
import { EconomicIndicatorsPanel } from "./economic/EconomicIndicatorsPanel";
import { IncidentDetailsPanel } from "./conflicts/IncidentDetailsPanel";
import { AlertDetailsPanel } from "./alerts/AlertDetailsPanel";
import { OSINTReportDetailsPanel } from "./osint/OSINTReportDetailsPanel";

interface RightPanelProps {
  mode: ViewMode;
  theme?: "light" | "dark";
}

export function RightPanel({ mode, theme = "dark" }: RightPanelProps): ReactNode {
  if (mode === "map") return <RightMapControlsPanel theme={theme} />;
  if (mode === "flights") return <FlightDetailsPanel theme={theme} />;
  if (mode === "satellites") return <SatelliteDetailsPanel theme={theme} />;
  if (mode === "streams") return <StreamInfoPanel theme={theme} />;
  if (mode === "economic") return <EconomicIndicatorsPanel theme={theme} />;
  if (mode === "conflicts") return <IncidentDetailsPanel theme={theme} />;
  if (mode === "alerts") return <AlertDetailsPanel theme={theme} />;
  if (mode === "osint") return <OSINTReportDetailsPanel theme={theme} />;
  return null;
}