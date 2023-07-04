import { TextField } from "@mui/material";
import React from "react";

export default function Input({
  title,
  value,
  onChange,
  placeholder,
  disabled,
  inputProps,
  error,
  ...rest
}) {
  return (
    <div className="mt-4 flex flex-col w-full gap-[5px]">
      <label
        for={`${title}-input`}
        className={`font-poppins text-sm leading-[18px] font-semibold ${
          disabled
            ? "text-gray-400"
            : error
            ? "text-[#d32f2f]"
            : "text-[#151515]"
        }  tracking-[.05em]`}
      >
        {title}
      </label>
      <TextField
        {...rest}
        error={error}
        id={`${title}-input`}
        inputProps={inputProps}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        fullWidth
        variant="outlined"
      />
      {error && (
        <p className={`${error ? "text-[#d32f2f]" : "text-[#151515]"} `}>
          {"*" + error}
        </p>
      )}
    </div>
  );
}
