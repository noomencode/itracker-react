import { Chip } from "@mui/material";

const SmallChip = (props) => {
  const { value, valueType, height, width } = props;
  return (
    <Chip
      sx={{
        borderRadius: "5px",
        height: height,
        width: width,
        bgcolor:
          value > 0 ? "rgba(0, 245, 159, 0.25)" : "rgba(251, 93, 137, 0.25)",
      }}
      color={value > 0 ? "secondary" : "error"}
      variant="outlined"
      label={`${value} ${valueType === "percentage" ? "%" : "€"}`}
    />
  );
};

export default SmallChip;
