const { AuthenticationError } = require("apollo-server-express");
const { User, MonthlyRecord } = require("../models");
const { signToken } = require("../utils/auth");
const { generateUniqueToken } = require("../utils/passwordReset");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    userById: async (parent, { userId }) => {
      return await User.findById(userId);
    },
    monthlyRecordByUser: async (parent, { userId, month, year }) => {
      return await MonthlyRecord.findOne({ user: userId, month, year });
    },
    currentMonthSummary: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        const totalIncome = user.incomeStreams.reduce(
          (sum, stream) => sum + stream.amount,
          0
        );
        const totalExpense = user.expenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        const savings = totalIncome - totalExpense;

        return {
          incomeStreams: user.incomeStreams,
          expenses: user.expenses,
          totalIncome,
          totalExpense,
          savings,
        };
      } catch (error) {
        throw new Error(
          `Failed to fetch current month summary: ${error.message}`
        );
      }
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      console.log(user);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addIncomeToUser: async (parent, { userId, source, amount }) => {
      return await User.findByIdAndUpdate(
        userId,
        { $push: { incomeStreams: { source, amount } } },
        { new: true }
      );
    },

    removeIncomeFromUser: async (parent, { userId, incomeId }) => {
      return await User.findByIdAndUpdate(
        userId,
        { $pull: { incomeStreams: { _id: incomeId } } },
        { new: true }
      );
    },

    addExpenseToUser: async (parent, { userId, description, amount }) => {
      return await User.findByIdAndUpdate(
        userId,
        { $push: { expenses: { description, amount } } },
        { new: true }
      );
    },

    removeExpenseFromUser: async (parent, { userId, expenseId }) => {
      return await User.findByIdAndUpdate(
        userId,
        { $pull: { expenses: { _id: expenseId } } },
        { new: true }
      );
    },

    forgotPassword: async (_, { email }, { sgMail }) => {
      console.log("Forgot password mutation triggered for email:", email);

      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        // Generate the reset token
        const resetToken = generateUniqueToken();
        await User.findOneAndUpdate({ email }, { resetToken });

        // Store the token in the user's record
        user.resetToken = resetToken;

        // Set token expiration (1 hour from now)
        user.resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);

        // Save the user with the updated fields
        await user.save();

        const resetLink = `https://jordanolguin.github.io/BudgetBabe/#/${resetToken}`;

        const msg = {
          to: email,
          from: "budgetbabeapps@gmail.com",
          subject: "Password Reset Request",
          text: `To reset your password, please click the following link: ${resetLink}`,
          html: `<strong>To reset your password, please click the following link:</strong> <a href="${resetLink}">Reset Password</a>`,
        };

        await sgMail.send(msg);

        return {
          success: true,
          message: "Password reset email sent",
        };
      } catch (error) {
        console.error("Error while processing forgot password:", error.message);
        throw new Error("Server Error");
      }
    },
    resetPassword: async (_, { token, newPassword }) => {
      try {
        // Validate the token.
        const user = await User.findOne({ resetToken: token });
        if (!user) {
          throw new Error("Invalid token");
        }

        const isTokenStillValid = jwt.verify(token, secret);
        if (!isTokenStillValid) {
          throw new Error("Token has expired");
        }

        // Update the user's password.
        user.password = newPassword;
        user.resetToken = undefined; // Invalidate the token
        user.resetTokenExpires = undefined; // Clear expiration

        await user.save();

        return {
          success: true,
          message: "Password updated successfully",
        };
      } catch (error) {
        console.error("Error while resetting password:", error.message);
        throw new Error("Server Error");
      }
    },
  },
};

module.exports = resolvers;
