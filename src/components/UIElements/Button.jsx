import React from "react";
import { Button as MUIButton } from "@mui/material";

export default function Button({ children, ...rest }) {
  return (
    <MUIButton
      variant="contained"
      {...rest}
      disableElevation
      sx={{
        py: 1,
        px: 2,
        background: "#7AC93B",
        borderRadius: "10px",
        fontSize: rest.size === "large" ? "20px" : "initial",
      }}
    >
      {children}
    </MUIButton>
  );
}
