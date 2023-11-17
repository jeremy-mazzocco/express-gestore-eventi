const generateJWT = require("../utilities/generateJWT");

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("username e password sono obbligatori");
    return;
  }

  const users = require("../db/users.json");

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    res.status(401).send("username e/o password errati");
    return;
  }

  // creazione del token
  const token = generateJWT(user);

  res.json({
    // token
    'token': token,
  });
}


module.exports = {
  login,
};
