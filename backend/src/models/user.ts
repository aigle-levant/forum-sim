const bcrypt = require("bcrypt");
const isEmail = require("validator");
const mongoose = require("mongoose");

// globals
const SALT = 10;
const MAX_LOGIN_ATTEMPTS = 3;
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
  lockUntil: Number,
});

userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.pre("save", async function (next) {
  // dont hash if not modified
  // hash only if modified
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // generate salt for hashing
    const salt = await bcrypt.genSalt(SALT);
    // hash password with new salt
    // also replace password with hashed password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// password verification
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.loginAttempts = async function () {
  // check if timeout's gone
  if (this.lockUntil && this.lockUntil < Date.now()) {
    // reset attempts
    this.loginAttempts = 1;
    this.lockUntil = undefined;
  } else {
    this.loginAttempts++;
  }

  // three and yer out
  if (this.loginAttempts >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    this.lockUntil = Date.now() + LOCK_UNTIL;
  }
  await this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
