import { Link } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { RendererFunction, TagCloud, TagEventHandler } from "react-tagcloud";

const artistsCloud = [
  { value: "Vincent van Gogh", count: 38 },
  { value: "Claude Monet", count: 30 },
  { value: "Edgar Degas", count: 28 },
  { value: "Pablo Picasso", count: 25 },
  { value: "Henri Matisse", count: 33 },
  { value: "Rembrandt", count: 18 },
  { value: "Johannes Vermeer", count: 20 },
  { value: "Paul Cézanne", count: 27 },
  { value: "Jackson Pollock", count: 19 },
  { value: "Egon Schiele", count: 24 }
];

const customRenderer: RendererFunction = (tag, size, color) => {
  return (
    <Link
      key={tag.value}
      underline="hover"
      sx={{
        display: "inline-block",
        cursor: "pointer",
        m: 0.3,
        color: color,
        typography: "body1",
        fontSize: size
      }}
    >
      {tag.value}
    </Link>
  );
};

type Props = {
  setMyInput: Dispatch<SetStateAction<string>>;
};

export default function PopularSearch({ setMyInput }: Props) {
  const handleClick: TagEventHandler = (artist) => {
    setMyInput(artist.value);
  };

  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={artistsCloud}
      disableRandomColor
      renderer={customRenderer}
      onClick={handleClick}
      // @ts-ignore
      style={{ textAlign: "center" }}
    />
  );
}
