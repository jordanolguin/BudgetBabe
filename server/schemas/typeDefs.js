const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type IncomeStream {
    id: ID!
    source: String
    amount: Float
  }

  type Expense {
    id: ID!
    description: String
    amount: Float
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    lastLogin: String
    incomeStreams: [IncomeStream]
    expenses: [Expense]
    resetPasswordToken: String
  }

  type MonthlyRecord {
    id: ID!
    user: ID!
    month: Int!
    year: Int!
    incomeStreams: [IncomeStream]
    expenses: [Expense]
    totalIncome: Float
    totalExpense: Float
    savings: Float
  }

  type MonthlySummary {
    incomeStreams: [IncomeStream]
    expenses: [Expense]
    totalIncome: Float
    totalExpense: Float
    savings: Float
  }

  type Response {
    success: Boolean!
    message: String!
  }

  type Query {
    userById(userId: ID!): User
    currentMonthSummary(userId: ID!): MonthlySummary!
    monthlyRecordByUser(userId: ID!, month: Int!, year: Int!): MonthlyRecord
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addIncomeToUser(userId: ID!, source: String!, amount: Float!): User
    removeIncomeFromUser(userId: ID!, incomeId: ID!): User
    addExpenseToUser(userId: ID!, description: String!, amount: Float!): User
    removeExpenseFromUser(userId: ID!, expenseId: ID!): User
    # stashCurrentMonth(userId: ID!, month: Int!, year: Int!): MonthlyRecord
    forgotPassword(email: String!): Response!
    resetPassword(token: String!, newPassword: String!): Response!
    deleteUser(userId: ID!): Boolean
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
