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
// mutation Mutation($userId: ID!, $description: String!, $amount: Float!) {
//   addExpenseToUser(userId: $userId, description: $description, amount: $amount) {
//     id
//     expenses {
//       amount
//       description
//       id
//     }
//   }
// }
// {
//   "userId": "64dd22b4a03eb8aab8f0c50a",
//   "description": "going out",
//   "amount": 100
// }

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
