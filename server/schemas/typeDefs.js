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
    incomeStreams: [IncomeStream]
    expenses: [Expense]
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

  type Query {
    userById(id: ID!): User
    monthlyRecordByUser(userId: ID!, month: Int!, year: Int!): MonthlyRecord
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addIncomeToUser(userId: ID!, source: String!, amount: Float!): User
    removeIncomeFromUser(userId: ID!, incomeId: ID!): User
    addExpenseToUser(userId: ID!, description: String!, amount: Float!): User
    removeExpenseFromUser(userId: ID!, expenseId: ID!): User
    createMonthlyRecord(userId: ID!, month: Int!, year: Int!): MonthlyRecord
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
