import { User } from "../DB/model/user.model.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (socket, next) => {
  console.log("from authentication: ", socket.id);
  let token = socket.handshake.auth.token;
  if (!token) return next(new Error("Token is required!"));

  if (!token.startsWith(process.env.BEARER_KEY))
    return next(new Error("Invalid key!"));

  token = token.split(process.env.BEARER_KEY)[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (_) {
    return next(new Error("Token is invalid!"));
  }

  const user = await User.findOne({ email: decoded.email });
  if (!user) return next(new Error("User not found!"));

  socket.user = user;

  return next();
};
