"use client";
import { Container, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import PaintingsList from "./PaintingsList";

export default function Data() {
  const [objectIDs, setObjectIDs] = useState([]);
  const [myInput, setMyInput] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedMyInput = useDebouncedValue(myInput, 500);

  const handleChange = (event) => {
    setMyInput(event.target.value);
  };

  useEffect(() => {
    if (debouncedMyInput.length > 3) {
      setIsLoading(true);

      axios
        .get(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${debouncedMyInput}`
        )
        .then((response) => {
          const result = response.data;
          if (result.total === 0) {
            setObjectIDs([]);
          } else {
            setObjectIDs(result.objectIDs.slice(0, 15));
          }
        })
        .catch((error) => {
          console.error("Chyba pri načítavaní údajov:", error);
        });
    }
  }, [debouncedMyInput]);

  useEffect(() => {
    setResults([]);
    const promises = objectIDs.map((id) => {
      return axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
    });
    Promise.all(promises)
      .then((res) => {
        const resultsData = res.map((response) => response.data);
        setResults(resultsData);
      })
      .catch((error) => {
        console.error("Chyba pri načítavaní údajov:", error);
      })
      .finally(() => setIsLoading(false));
  }, [objectIDs]);

  return (
    <Container>
      <TextField
        variant="outlined"
        label="Vyhľadávať"
        value={myInput}
        onChange={handleChange}
      />
      <PaintingsList
        results={results}
        myInput={myInput}
        isLoading={isLoading}
      />
    </Container>
  );
}
