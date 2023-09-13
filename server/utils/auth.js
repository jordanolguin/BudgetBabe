const jwt = require("jsonwebtoken");
const MonthlyRecord = require("../models/MonthlyRecord");
const User = require("../models/User");

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  authMiddleware: async function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;

      // New logic to check and stash monthly data
      const user = await User.findById(req.user._id);
      if (user) {
        const currentDate = new Date();
        const prevMonth =
          currentDate.getMonth() === 0 ? 11 : currentDate.getMonth();
        const prevYear =
          currentDate.getMonth() === 0
            ? currentDate.getFullYear() - 1
            : currentDate.getFullYear();

        if (
          user.lastLogin &&
          user.lastLogin.getMonth() !== currentDate.getMonth()
        ) {
          // Logic to stash monthly data for the PREVIOUS month
          const existingRecord = await MonthlyRecord.findOne({
            user: req.user._id,
            month: prevMonth,
            year: prevYear,
          });

          if (!existingRecord) {
            const totalIncome = user.incomeStreams.reduce(
              (sum, stream) => sum + stream.amount,
              0
            );
            const totalExpense = user.expenses.reduce(
              (sum, expense) => sum + expense.amount,
              0
            );
            const savings = totalIncome - totalExpense;

            const newRecord = {
              user: req.user._id,
              month: prevMonth,
              year: prevYear,
              incomeStreams: user.incomeStreams,
              expenses: user.expenses,
              totalIncome: totalIncome,
              totalExpense: totalExpense,
              savings: savings,
            };

            await MonthlyRecord.create(newRecord);
          }
          user.lastLogin = currentDate;
          await user.save();
        }
      }
    } catch (error) {
      console.log(
        "Invalid token or error in monthly data stash:",
        error.message
      );
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    console.log("payload:", payload);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
