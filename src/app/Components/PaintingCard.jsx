import { Card, Stack, Typography } from "@mui/material";

export default function PaintingCard({ painting }) {
  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        height: "100%",
        display: "flex",
        flexDirection: "column"
      })}
    >
      <Stack>
        <img src={painting["primaryImageSmall"]} alt=""></img>
        <Typography variant="h5" gutterBottom>
          {painting.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {painting["artistDisplayName"]}, {painting["objectDate"]}
        </Typography>
      </Stack>
    </Card>
  );
}
