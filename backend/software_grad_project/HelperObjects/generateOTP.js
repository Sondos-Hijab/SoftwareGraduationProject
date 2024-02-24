const generateOTP = () => {
  const otpLength = 5;
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;

  const otp = Math.floor(min + Math.random() * (max - min + 1)).toString();

  return otp;
};

module.exports = generateOTP;
