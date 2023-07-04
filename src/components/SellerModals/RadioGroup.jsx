import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function RowRadioButtonsGroup({ value, onChange }) {
  var colorRadio = {
    color: "rgb(92, 49, 235)",
    "&.Mui-checked": { color: " rgb(92, 49, 235)" },
  };
  return (
    <FormControl>
      <RadioGroup
        value={value}
        onChange={(e) => onChange(e.target.value)}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value={0}
          control={<Radio sx={colorRadio} />}
          label="0%"
        />
        <FormControlLabel
          value={5}
          control={<Radio sx={colorRadio} />}
          label="5%"
        />
        <FormControlLabel
          value={12}
          control={<Radio sx={colorRadio} />}
          label="12%"
        />
        <FormControlLabel
          value={18}
          control={<Radio sx={colorRadio} />}
          label="18%"
        />
        <FormControlLabel
          value={28}
          control={<Radio sx={colorRadio} />}
          label="28%"
        />
      </RadioGroup>
    </FormControl>
  );
}
