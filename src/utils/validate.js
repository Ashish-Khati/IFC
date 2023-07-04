export const verifyString = (name, value) => {
  if (name === "phoneNumber") {
    if (value.length !== 10 || !/^[0-9]*$/.test(value)) {
      return { error: "Please enter a valid 10 digit mobile number." };
    }
  } else if (name === "otp") {
    if (value.length !== 6 || !/^[0-9]*$/.test(value)) {
      return { error: "Please enter a numeric 6 digit OTP." };
    }
  } else if (name === "password") {
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)) {
      return {
        error:
          "Password should be 6 character long and must contain a special character, a number.",
      };
    }
  }
  return { error: "" };
};
