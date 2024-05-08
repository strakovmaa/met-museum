"use client";
import {
  Checkbox,
  Container,
  FormControlLabel,
  TextField
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { Painting } from "../types";
import PaintingsList from "./PaintingsList";
import PopularSearch from "./PopularSearch";

export default function Data() {
  const [objectIDs, setObjectIDs] = useState<number[]>([]);
  const [myInput, setMyInput] = useState("");
  const [results, setResults] = useState<Painting[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onView, setOnView] = useState(true);

  const debouncedMyInput = useDebouncedValue(myInput, 500);

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setMyInput(event.target.value);
  };

  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOnView(event.target.checked);
  };

  useEffect(() => {
    if (debouncedMyInput.length > 3) {
      setIsLoading(true);
      const isOnView = onView ? "&isOnView=true" : "";
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${debouncedMyInput}${isOnView}`;
      axios
        .get(url)
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
  }, [debouncedMyInput, onView]);

  useEffect(() => {
    setResults([]);
    const promises = objectIDs.map((id) => {
      return axios.get<Painting>(
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
    <>
      <Container maxWidth="md">
        <TextField
          fullWidth
          variant="outlined"
          label="Vyhľadávať"
          value={myInput}
          onChange={handleInputChange}
        />
        <FormControlLabel
          control={<Checkbox checked={onView} onChange={handleCheckChange} />}
          label="Iba vystavené"
        />
        {myInput.length === 0 && <PopularSearch setMyInput={setMyInput} />}
      </Container>
      <Container>
        <PaintingsList
          results={results}
          myInput={myInput}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
}
