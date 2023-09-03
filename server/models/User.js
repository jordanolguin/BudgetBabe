const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

//income sub-schmea
const incomeStreamSchema = new Schema({
  source: String,
  amount: Number,
});
//expense sub-schema
const expenseSchema = new Schema({
  description: String,
  amount: Number,
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Must be a valid email."],
  },
  lastLogin: { type: Date, default: Date.now },
  incomeStreams: [incomeStreamSchema],
  expenses: [expenseSchema],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
