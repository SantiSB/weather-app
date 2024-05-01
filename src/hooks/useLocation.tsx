"use client";
import { useState, useEffect } from "react";
import { fetchLocationByCity, fetchLocationByZip } from "@/services/fetch";
import { Location } from "@/types/location";

type UseLocationFetchProps = {
  city?: string | null;
  zip?: string | null;
  country?: string | null;
};

type UseLocationFetchReturn = {
  location: Location | null;
  loading: boolean;
  error: Error | null;
};

const useLocationFetch = ({
  city,
  zip,
  country,
}: UseLocationFetchProps): UseLocationFetchReturn => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      setError(null);
      try {
        if (city) {
          const locations = await fetchLocationByCity(
            city,
            "",
            country ? country : ""
          );
          if (locations.length > 0) {
            setLocation(locations[0]);
          } else {
            setError(new Error("No location found with the specified city"));
          }
        } else if (zip && country) {
          const data = await fetchLocationByZip(zip, country);
          setLocation(data);
        } else {
          setError(new Error("Insufficient parameters"));
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [city, zip, country]);

  return { location, loading, error };
};

export default useLocationFetch;
