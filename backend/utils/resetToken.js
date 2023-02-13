// creating token and save in cookies

const resetToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookies
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 01 * 60 * 1000),
    httpOnly: true,
  };
  
  res.status(statusCode).cookie("resetToken", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = resetToken;
