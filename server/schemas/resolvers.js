const { AuthenticationError } = require("apollo-server-express");
const { User, MonthlyRecord } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    userById: async (parent, { userId }) => {
      return await User.findById(userId);
    },
    monthlyRecordByUser: async (parent, { userId, month, year }) => {
      return await MonthlyRecord.findOne({ user: userId, month, year });
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

    createMonthlyRecord: async (parent, { userId, month, year }) => {
      try {
        // Check if record already exists for the given month and year
        const existingRecord = await MonthlyRecord.findOne({
          user: userId,
          month,
          year,
        });
        if (existingRecord) {
          throw new Error("A record for this month and year already exists.");
        }

        // Retrieve the user to get current incomeStreams and expenses
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

        const newRecord = {
          user: userId,
          month,
          year,
          incomeStreams: [...user.incomeStreams],
          expenses: [...user.expenses],
          totalIncome: totalIncome,
          totalExpense: totalExpense,
          savings: savings,
        };

        return await MonthlyRecord.create(newRecord);
      } catch (error) {
        throw new Error(`Failed to create monthly record: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
