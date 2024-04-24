import { Chip, Stack } from "@mui/material";

const artists = [
  "Vincent van Gogh",
  "Claude Monet",
  "Edgar Degas",
  "Pablo Picasso",
  "Henri Matisse",
  "Rembrandt",
  "Johannes Vermeer",
  "Paul Cézanne",
  "Jackson Pollock",
  "Egon Schiele"
];

export default function PopularSearch({ setMyInput }) {
  const handleClick = (artist) => {
    setMyInput(artist);
  };

  return (
    <Stack direction="row" flexWrap="wrap" gap={1} my={2}>
      {artists.map((artist) => {
        return (
          <Chip
            key={artist}
            label={artist}
            onClick={() => handleClick(artist)}
          />
        );
      })}
    </Stack>
  );
}
