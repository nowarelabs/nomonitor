import type { ReactNode } from "react";
import type { ViewMode } from "../EditorLayout";

import { KenyaMapPanel } from "./map/kenya/KenyaMapPanel";
import { CountiesPanel } from "./map/counties/CountiesPanel";
import { AirportsPanel } from "./map/airports/AirportsPanel";
import { PortsPanel } from "./map/ports/PortsPanel";
import { MapAlertsPanel } from "./map/alerts/AlertsPanel";
import { MapConflictsPanel } from "./map/conflicts/MapConflictsPanel";
import { MapFlightsPanel } from "./map/flights/MapFlightsPanel";
import { SatellitesPanel as MapSatellitesPanel } from "./map/satellites/SatellitesPanel";

import { AllFlightsPanel } from "./flights/all/AllFlightsPanel";
import { KenyaAirwaysPanel } from "./flights/kenya/KenyaAirwaysPanel";
import { JambojetPanel } from "./flights/jambo/JambojetPanel";
import { Fly540Panel } from "./flights/fly540/Fly540Panel";
import { SafarilinkPanel } from "./flights/safarilink/SafarilinkPanel";

import { AllSatellitesPanel } from "./satellites/all/AllSatellitesPanel";
import { ReconPanel } from "./satellites/recon/ReconPanel";
import { WeatherPanel } from "./satellites/weather/WeatherPanel";
import { CommPanel } from "./satellites/comm/CommPanel";
import { NavigationNavPanel } from "./satellites/nav/NavigationNavPanel";

import { AllStreamsPanel } from "./streams/all/AllStreamsPanel";
import { KTNPanel } from "./streams/ktn/KTNPanel";
import { CitizenPanel } from "./streams/citizen/CitizenPanel";
import { BBCPanel } from "./streams/bbc/BBCPanel";

import { OverviewPanel } from "./economic/overview/OverviewPanel";
import { CurrencyPanel } from "./economic/currency/CurrencyPanel";
import { GDPPanel } from "./economic/gdp/GDPPanel";
import { TradePanel } from "./economic/trade/TradePanel";
import { MarketsPanel } from "./economic/markets/MarketsPanel";

import { AllConflictsPanel } from "./conflicts/all/AllConflictsPanel";
import { ArmedPanel } from "./conflicts/armed/ArmedPanel";
import { ProtestPanel } from "./conflicts/protest/ProtestPanel";
import { TribalPanel } from "./conflicts/tribal/TribalPanel";
import { ResourceConflictPanel } from "./conflicts/resource/ResourceConflictPanel";

import { AllAlertsPanel } from "./alerts/all/AllAlertsPanel";
import { CriticalAlertsPanel } from "./alerts/critical/CriticalAlertsPanel";
import { HighAlertsPanel } from "./alerts/high/HighAlertsPanel";
import { MediumAlertsPanel } from "./alerts/medium/MediumAlertsPanel";
import { LowAlertsPanel } from "./alerts/low/LowAlertsPanel";

import { AllOSINTPanel } from "./osint/all/AllOSINTPanel";
import { CIAPanel } from "./osint/cia/CIAPanel";
import { MilitaryPanel } from "./osint/military/MilitaryPanel";
import { PoliticalPanel } from "./osint/political/PoliticalPanel";
import { EconomicOSINTPanel } from "./osint/economic/EconomicOSINTPanel";

import { useAllFlights, useAirlineFlights, type FlightData } from "../../../hooks";

interface PanelProps {
  theme?: "light" | "dark";
}

interface LeftPanelProps {
  mode: ViewMode;
  navId: string;
  theme?: "light" | "dark";
}

function DefaultPanel({ theme }: PanelProps) {
  return (
    <div className="p-4">
      <p className="text-sm opacity-60">Select a navigation item</p>
    </div>
  );
}

export function LeftPanel({ mode, navId, theme = "dark" }: LeftPanelProps): ReactNode {
  const { flights: allFlights } = useAllFlights();
  const { flights: kenyaFlights } = useAirlineFlights("KQ");
  const { flights: jamboFlights } = useAirlineFlights("JMB");
  const { flights: fly540Flights } = useAirlineFlights("FY");
  const { flights: safarilinkFlights } = useAirlineFlights("XK");

  if (mode === "map") {
    if (navId === "kenya") return <KenyaMapPanel theme={theme} />;
    if (navId === "counties") return <CountiesPanel theme={theme} />;
    if (navId === "airports") return <AirportsPanel theme={theme} />;
    if (navId === "ports") return <PortsPanel theme={theme} />;
    if (navId === "alerts") return <MapAlertsPanel theme={theme} />;
    if (navId === "conflicts") return <MapConflictsPanel theme={theme} />;
    if (navId === "flights") return <MapFlightsPanel theme={theme} flights={allFlights} />;
    if (navId === "satellites") return <MapSatellitesPanel theme={theme} />;
  }
  
  if (mode === "flights") {
    if (navId === "all") return <AllFlightsPanel theme={theme} flights={allFlights} />;
    if (navId === "kenya") return <KenyaAirwaysPanel theme={theme} flights={kenyaFlights} />;
    if (navId === "jambo") return <JambojetPanel theme={theme} flights={jamboFlights} />;
    if (navId === "fly540") return <Fly540Panel theme={theme} flights={fly540Flights} />;
    if (navId === "safarilink") return <SafarilinkPanel theme={theme} flights={safarilinkFlights} />;
  }
  
  if (mode === "satellites") {
    if (navId === "all") return <AllSatellitesPanel theme={theme} />;
    if (navId === "recon") return <ReconPanel theme={theme} />;
    if (navId === "weather") return <WeatherPanel theme={theme} />;
    if (navId === "comm") return <CommPanel theme={theme} />;
    if (navId === "nav") return <NavigationNavPanel theme={theme} />;
  }
  
  if (mode === "streams") {
    if (navId === "all") return <AllStreamsPanel theme={theme} />;
    if (navId === "ktn") return <KTNPanel theme={theme} />;
    if (navId === "citizen") return <CitizenPanel theme={theme} />;
    if (navId === "bbc") return <BBCPanel theme={theme} />;
  }
  
  if (mode === "economic") {
    if (navId === "overview") return <OverviewPanel theme={theme} />;
    if (navId === "currency") return <CurrencyPanel theme={theme} />;
    if (navId === "gdp") return <GDPPanel theme={theme} />;
    if (navId === "trade") return <TradePanel theme={theme} />;
    if (navId === "markets") return <MarketsPanel theme={theme} />;
  }
  
  if (mode === "conflicts") {
    if (navId === "all") return <AllConflictsPanel theme={theme} />;
    if (navId === "armed") return <ArmedPanel theme={theme} />;
    if (navId === "protest") return <ProtestPanel theme={theme} />;
    if (navId === "tribal") return <TribalPanel theme={theme} />;
    if (navId === "resource") return <ResourceConflictPanel theme={theme} />;
  }
  
  if (mode === "alerts") {
    if (navId === "all") return <AllAlertsPanel theme={theme} />;
    if (navId === "critical") return <CriticalAlertsPanel theme={theme} />;
    if (navId === "high") return <HighAlertsPanel theme={theme} />;
    if (navId === "medium") return <MediumAlertsPanel theme={theme} />;
    if (navId === "low") return <LowAlertsPanel theme={theme} />;
  }
  
  if (mode === "osint") {
    if (navId === "all") return <AllOSINTPanel theme={theme} />;
    if (navId === "cia") return <CIAPanel theme={theme} />;
    if (navId === "military") return <MilitaryPanel theme={theme} />;
    if (navId === "political") return <PoliticalPanel theme={theme} />;
    if (navId === "economic") return <EconomicOSINTPanel theme={theme} />;
  }
  
  return <DefaultPanel theme={theme} />;
}