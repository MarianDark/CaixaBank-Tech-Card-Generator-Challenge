import React, { useCallback, memo } from "react";
import { Box, Button, Select, MenuItem, Typography } from "@mui/material";

const fonts = ["Arial", "Courier New", "Georgia"];

const CardEditControls = ({ background, setBackground, font, setFont, removeCard, id }) => {
  const handleBackgroundChange = useCallback(
    (e) => {
      const newColor = e.target.value;
      if (background !== newColor) {
        setBackground(newColor);
      }
    },
    [background, setBackground]
  );

  const handleFontChange = useCallback(
    (e) => {
      const newFont = e.target.value;
      if (font !== newFont) {
        setFont(newFont);
      }
    },
    [font, setFont]
  );

  const handleRemove = useCallback(() => removeCard(id), [removeCard, id]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2,
      }}
      data-testid="card-edit-controls"
    >
      <Box display="flex" alignItems="center">
        <Typography sx={{ mr: 1 }}>Color:</Typography>
        <input type="color" value={background} onChange={handleBackgroundChange} style={{ width: 40, height: 40, border: "none", cursor: "pointer" }} data-testid="color-picker" />
      </Box>

      <Box display="flex" alignItems="center">
        <Typography sx={{ mr: 1 }}>Typography:</Typography>
        <Select id="font-selector" name="font" size="small" value={font} onChange={handleFontChange} sx={{ width: 200 }} data-testid="font-selector">
          {fonts.map((f) => (
            <MenuItem key={f} value={f}>
              {f}
            </MenuItem>
          ))}
        </Select>
      </Box>
      
      <Button variant="contained" color="error" sx={{ width: "30%" }} onClick={handleRemove} data-testid="remove-card-button">
        Remove Card
      </Button>
    </Box>
  );
};

export default memo(CardEditControls);
