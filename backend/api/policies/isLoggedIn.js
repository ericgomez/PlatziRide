module.exports = async function (req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    return res.badRequest({error: 'Authorization header not present'});
  }

  const token = req.headers.authorization;
  const decodedToken = AuthenticationService.JWTVerify(token);
  const user = await User.findOne({id: decodedToken.user});

  if (!user) {
    return next({error: 'Unauthorized'});
  }

  req.user = user.id;
  next();

};
