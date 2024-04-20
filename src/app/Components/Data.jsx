"use client";
import { Container, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PaintingsList from "./PaintingsList";

export default function Data() {
  const [objectIDs, setObjectIDs] = useState([]);
  const [myInput, setMyInput] = useState("");
  const [results, setResults] = useState([]);
  console.log("results:", results);

  const handleChange = (event) => {
    setMyInput(event.target.value);
  };

  useEffect(() => {
    if (myInput.length > 3) {
      axios
        .get(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${myInput}`
        )
        .then((response) => {
          const result = response.data;
          console.log("result:", result);
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
  }, [myInput]);

  useEffect(() => {
    setResults([]);
    objectIDs.forEach((id) => {
      axios
        .get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        )
        .then((response) => {
          const result = response.data;
          console.log("result:", result);
          setResults((prev) => [...prev, result]);
        })
        .catch((error) => {
          console.error("Chyba pri načítavaní údajov:", error);
        });
    });
  }, [objectIDs]);

  return (
    <Container>
      <TextField
        variant="outlined"
        label="Vyhľadávať"
        value={myInput}
        onChange={handleChange}
      />
      <PaintingsList results={results} myInput={myInput} />
    </Container>
  );
}
