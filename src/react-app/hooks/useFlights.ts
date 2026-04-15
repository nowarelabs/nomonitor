import { useState, useEffect } from "react";

export interface FlightData {
  icao24: string;
  callsign: string;
  originCountry: string;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  heading: number;
  isArriving: boolean;
  isDeparting: boolean;
}

export interface FlightsResponse {
  timestamp: number;
  total: number;
  flights: FlightData[];
}

const WORKER_URL = "http://localhost:8787";

export function useFlights(endpoint: string) {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchFlights() {
      try {
        const response = await fetch(`${WORKER_URL}${endpoint}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data: FlightsResponse = await response.json();
        if (mounted) {
          setFlights(data.flights);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError((err as Error).message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchFlights();
    const interval = setInterval(fetchFlights, 60000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [endpoint]);

  return { flights, loading, error };
}

export function useAllFlights() {
  return useFlights("/api/flights/all");
}

export function useAirportFlights(airportCode: string) {
  return useFlights(`/api/flights/airport/${airportCode}`);
}

export function useAirlineFlights(airlineCode: string) {
  return useFlights(`/api/flights/airline/${airlineCode}`);
}