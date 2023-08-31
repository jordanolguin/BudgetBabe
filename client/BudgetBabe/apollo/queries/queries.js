import { gql } from "@apollo/client";

export const CURRENT_MONTH_SUMMARY = gql`
  query CurrentMonthSummary($userId: ID!) {
    currentMonthSummary(userId: $userId) {
      incomeStreams {
        id
        source
        amount
      }
      expenses {
        id
        description
        amount
      }
      totalIncome
      totalExpense
      savings
    }
  }
`;

export const MONTHLY_RECORD_BY_USER = gql`
  query MonthlyRecordByUser($userId: ID!, $month: Int!, $year: Int!) {
    monthlyRecordByUser(userId: $userId, month: $month, year: $year) {
      id
      user
      month
      year
      incomeStreams {
        id
        source
        amount
      }
      expenses {
        id
        description
        amount
      }
      totalIncome
      totalExpense
      savings
    }
  }
`;
