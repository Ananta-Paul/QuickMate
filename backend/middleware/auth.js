const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Authentication token missing" });
    const data = jwt.verify(token, process.env.SECRET);
    // console.log(data);
    if (!data || !data?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.body.id = data?.id;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
module.exports = auth;
