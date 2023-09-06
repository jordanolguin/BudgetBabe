import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const ADD_EXPENSE_TO_USER = gql`
  mutation addExpenseToUser(
    $userId: ID!
    $description: String!
    $amount: Float!
  ) {
    addExpenseToUser(
      userId: $userId
      description: $description
      amount: $amount
    ) {
      id
      expenses {
        amount
        description
        id
      }
    }
  }
`;

export const ADD_INCOME_TO_USER = gql`
  mutation addIncomeToUser($userId: ID!, $source: String!, $amount: Float!) {
    addIncomeToUser(userId: $userId, source: $source, amount: $amount) {
      id
      incomeStreams {
        amount
        source
        id
      }
      username
    }
  }
`;

export const REMOVE_INCOME = gql`
  mutation RemoveIncomeFromUser($userId: ID!, $incomeId: ID!) {
    removeIncomeFromUser(userId: $userId, incomeId: $incomeId) {
      id
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation RemoveExpenseFromUser($userId: ID!, $expenseId: ID!) {
    removeExpenseFromUser(userId: $userId, expenseId: $expenseId) {
      id
    }
  }
`;

// export const STASH_CURRENT_MONTH = gql`
//   mutation StashCurrentMonth($userId: ID!, $month: Int!, $year: Int!) {
//     stashCurrentMonth(userId: $userId, month: $month, year: $year) {
//       month
//       year
//       totalIncome
//       totalExpense
//       savings
//       incomeStreams {
//         amount
//         source
//         id
//       }
//       expenses {
//         amount
//         description
//         id
//       }
//     }
//   }
// `;

export const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation SendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($resetToken: String!, $newPassword: String!) {
    resetPassword(resetToken: $resetToken, newPassword: $newPassword)
  }
`;