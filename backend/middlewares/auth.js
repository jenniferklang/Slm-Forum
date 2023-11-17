const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const publicRoutes = [
    "/api/auth/register",
    "/api/auth/login",
    "/api/auth/validate",
    "/api/forum",
    "/_next/webpack-hmr",
    "/socketchat/",
  ];

  if (publicRoutes.includes(req.path)) {
    return next();
  }
  console.log("authenticateToken:" + req.path);

  const token = req.cookies.token;

  if (!token) return res.status(401).send("Åtkomst nekad.");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Åtkomst nekad. Fel token.");

    req.userId = decoded.userId;

    next();
  });
};

const checkToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Åtkomst nekad. Inget token.", valid: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Åtkomst nekad. Fel token.", valid: false });

    res.status(200).json({
      message: "Token validerad.",
      valid: true,
      userId: decoded.userId,
    });
  });
};

module.exports = { authenticateToken, checkToken };
