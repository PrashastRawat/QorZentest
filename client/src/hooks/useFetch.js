import { useEffect, useState } from "react";

export default function useFetch(fetcher, initialValue = []) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetcher()
      .then((res) => {
        if (mounted) setData(res.data?.data ?? res.data ?? initialValue);
      })
      .catch((err) => {
        if (mounted) setError(err.response?.data?.message || "Unable to load data");
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, []);

  return { data, setData, loading, error };
}
