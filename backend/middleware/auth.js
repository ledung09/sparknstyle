export const hasPermission = (req, res, next) => {
  const auth = req.auth;
  console.log(auth);
  if (!auth.sessionId && !auth.userId && !auth.claims) {
    return res.status(403).send("Forbidden");
  }
  return next();
};
