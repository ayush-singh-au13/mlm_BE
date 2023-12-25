const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {
  try {
    if (req.headers["x-access-token"] === undefined) {
      return res
        .status(200)
        .json({ status: 403, message: "Token is required !!!" });
    }
    const token = req.headers["x-access-token"];

    if (!token) {
      return res
        .status(200)
        .json({ status: 403, message: "Token is required !!!" });
    }
    jwt.verify(token, process.env.SECRET, (err, data) => {
      if (err) {
        return res
          .status(200)
          .json({ status: 401, message: "Unauthorized User !!" });
      }
      req.user = data;
      next();
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "INTERNAL SERVER ERROR" });
  }
};
