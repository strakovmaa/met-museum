import { Alert, Box, Grid } from "@mui/material";
import PaintingCard from "./PaintingCard";

export default function PaintingsList({ results, myInput }) {
  return (
    <Box sx={{ minWidth: 275, mt: 3 }}>
      {results.length === 0 && myInput.length > 0 ? (
        <Alert variant="filled" severity="info">
          Nenašli sa žiadne položky
        </Alert>
      ) : (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {results.map((painting) => (
            <Grid key={painting.title} item xs={12} md={4}>
              <PaintingCard painting={painting} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
