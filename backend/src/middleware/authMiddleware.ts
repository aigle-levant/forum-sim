// modules
require("dotenv").config();
const { auth } = require("express-openid-connect");
const jwt = require("jsonwebtoken");
import type { Request, Response, NextFunction } from "express";

// to prevent annoying ts errors
// screaming at my face
interface jwtUser {
  userId: string;
}

interface authReq extends Request {
  user?: jwtUser;
}

// verify jwt
exports.verifyToken = (req: authReq, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  // if it doesnt start with bearer, its fraud!
  // same if it doesnt exist to begin with
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // great! it's authorized
  // time for verification: jws
  let tokenParts = authHeader.split("");
  const token = tokenParts[1];
  try {
    const decrypt = jwt.verify(token, process.env.JWT_SECRET);
    // if decrypt success, attach that info to
    // request of user
    req.user = decrypt;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
