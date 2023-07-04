import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButton(props) {
  const { values, value, title, onChange, name } = props;
  return (
    <div className="mt-4">
      <label
        htmlFor="fcd-radio-btn"
        id="fcd-radio-btn"
        className="mt-2 font-poppins text-sm leading-[18px] font-semibold text-[#151515] tracking-[.05em]"
      >
        {title}
      </label>
      <RadioGroup
        row
        value={value}
        name={name}
        onChange={onChange}
        aria-labelledby="fcd-radio-btn"
        id="fcd-radio-btn"
      >
        {values.map((val) => {
          return (
            <FormControlLabel value={val} control={<Radio />} label={val} />
          );
        })}
      </RadioGroup>
    </div>
  );
}
