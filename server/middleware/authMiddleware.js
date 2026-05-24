const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

  let token;

  // Check Authorization Header

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      // Get Token

      token =
        req.headers.authorization.split(" ")[1];

      // Verify Token

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Save User Info

      req.user = {
        id: decoded.id,
      };

      next();

    } catch (error) {

      return res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  if (!token) {

    return res.status(401).json({
      message: "No token found",
    });
  }
};

module.exports = protect;