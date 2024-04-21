import { StarRate } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material";
import Picture from "./Picture";
export default function PaintingCard({
  painting: {
    title,
    artistDisplayName,
    objectDate,
    tags,
    primaryImageSmall,
    medium,
    objectURL,
    isHighlight
  }
}) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box flexGrow={1}>
        <Picture imageSrc={primaryImageSmall} />
        <CardContent>
          <Typography variant="h6" gutterBottom mt={1}>
            {title}
          </Typography>

          <Typography gutterBottom>
            <strong>{artistDisplayName}</strong>, {objectDate}
          </Typography>
          <Typography>{medium}</Typography>

          <Stack
            my={2}
            direction="row"
            gap={1}
            alignContent="space-between"
            flexWrap="wrap"
          >
            {isHighlight && (
              <Chip icon={<StarRate />} label="Obľúbené" color="secondary" />
            )}
            {(tags || []).map((tag) => (
              <Chip key={tag.term} label={tag.term} />
            ))}
          </Stack>
        </CardContent>
      </Box>
      <CardActions>
        <Button size="small" href={objectURL}>
          Zaujíma Vás viac?
        </Button>
      </CardActions>
    </Card>
  );
}
