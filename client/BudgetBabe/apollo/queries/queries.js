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
