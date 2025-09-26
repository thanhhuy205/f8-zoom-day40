import { useEffect, useState } from "react";

type Options = {
  headers?: Record<string, string>;
  body: any;
};

export const useApi = (
  url: string,
  method: string = "GET",
  options?: Options
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
          },
          body: method !== "GET" ? JSON.stringify(options?.body) : undefined,
        });
        if (!res.ok) throw new Error("Error api");

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url, method, JSON.stringify(options)]);

  return { data, loading, error };
};
