import dotenv from "dotenv";
import bcryptjs from "bcryptjs";

dotenv.config({ path: "./.env" });

export async function webhookAuthorizer(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const secret = process.env.CLERK_SECRET_KEY;

    const compare = await bcryptjs.compare(secret, token);

    if (!compare) {
      const error = new Error("Forbidden: Invalid token");
      error.statusCode = 403;
      return next(error);
    }

    next();
  } else {
    const error = new Error("Unauthorized: No token provided");
    error.statusCode = 401;
    return next(error);
  }
}
