import jwt from "jsonwebtoken";
function auth(req, res, next) {
  const retriveToken = req.header("Authorization");
  if (!retriveToken) {
    res.status(500).send({ msg: "User is not authenticated!" });
  }
  const splitToken = retriveToken.split(" ");
  const fetchToken = splitToken[1];

  const user = jwt.verify(fetchToken, "eState");

  req.user = user;
  next();
}

export default auth;
