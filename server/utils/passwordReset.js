const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const resetTokenExpiration = process.env.JWT_EXPIRATION;

module.exports = {
  generateUniqueToken: function () {
    const resetToken = jwt.sign({}, secret, {
      expiresIn: resetTokenExpiration,
    });
    return resetToken;
  },

  isTokenExpired: function (token) {
    try {
      jwt.verify(token, secret);
      return false;
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return true;
      }
      throw err;
    }
  },
};
