import { isEmail } from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// hard-coded vars
const SALT = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_UNTIL = 2 * 60 * 60 * 1000;

// user schema
const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
    // let all emails be unique
    // no two emails should match
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  // keep track of login attempts
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  // if login attempts exceeded
  // lock until a certain no. of days
  lockUtil: Number,
});

userSchema.pre("save", async function (next) {
  // dont hash if not modified
  // hash only if modified
  if (!this.isModified("password")) {
    return next();
  }
  // generate salt for hashing
  bcrypt.genSalt(SALT, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash password with new salt
    bcrypt.hash(this.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      // replace password with hashed password
      this.password = hash;
      next();
    });
  });
});

// password verification
userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

export default mongoose.model("User", userSchema);
