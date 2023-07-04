export const sendOTP = async (phoneNumber, otp) => {
  if (!phoneNumber) return;
  fetch(
    `https://api.authkey.io/request?authkey=${process.env.REACT_APP_OTP_AUTH_KEY}&country_code=91&sid=8391&mobile=${phoneNumber}&expireTime=1&phoneNumber=${otp}`
  );
};
