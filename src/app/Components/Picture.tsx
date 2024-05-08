import { InsertPhoto } from "@mui/icons-material";
import { Box, CardMedia } from "@mui/material";
import { grey } from "@mui/material/colors";

type Props = {
  imageSrc: string;
};

export default function Picture({ imageSrc }: Props) {
  return (
    <Box sx={{ height: 290, backgroundColor: grey[100] }}>
      {imageSrc.length === 0 ? (
        <InsertPhoto
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
            color: "white"
          }}
        />
      ) : (
        <CardMedia
          component="img"
          image={imageSrc}
          alt=""
          sx={{ height: "100%", objectFit: "contain" }}
        />
      )}
    </Box>
  );
}
