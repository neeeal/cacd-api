/*
  User Validation
*/

// TODO: add validation for important routes and required fields
exports.passwordConfirmation = async (req, res, next) => {
  const { password, passwordConfirmation } = req.body;
  if (password!==passwordConfirmation) {
    return res.status(400).send({ error: "Passwords do not match" });
  }

  const regex = /^(?=.*[!@#$%^_&*-])[a-zA-Z0-9!@#$%^_&*-]+$/;
  if (!regex.test(password)) {
    return res.status(400).send({ error: "Password must contain at least one special character, one number, one lowercase, one uppercase, and 8 characters long." });
  }
  next();
}

exports.userRegisterAndUpdate = async (req, res, next) => {
  // req.body = (req.body && Object.keys(req.body).length)  || {...req.fields};
  const { OID, email, password, firstName, lastName } = req.body;
  if (!email ||!password |!firstName |!lastName) {
    return res.status(400).send({ error: "All fields are required" });
  }
  next();
}

