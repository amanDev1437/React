import { useState, useEffect } from "react";

const KEY = "81c3713f";
const API_URL = `https://www.omdbapi.com/?apikey=${KEY}`;
const tempQuery = "batman";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}&s=${query || tempQuery}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Something went wrong with the API");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
      } catch (err) {
        console.log(err);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return {movies, error, isLoading}
}
