const jwt = require("jsonwebtoken");
const JWT_SECRET = "VaibhavIsAGoodBoi";

const fetchuser = (req, res, next) => {
  //get the user from the jwt token and add id to the req object
  const token = req.header("auth-token"); //thunderclient request header se le rhe. Toh wahan dena hoga pehle
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
};

module.exports = fetchuser;
