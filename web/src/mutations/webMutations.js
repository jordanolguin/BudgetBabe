import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      success
      message
    }
  }
`;
// export const WEB_SEND_PASSWORD_RESET_EMAIL = gql`
//   mutation webSendPasswordResetEmail($email: String!) {
//     webSendPasswordResetEmail(email: $email)
//   }
// `;

// export const WEB_RESET_PASSWORD = gql`
//   mutation webResetPassword($resetToken: String!, $newPassword: String!) {
//     webResetPassword(resetToken: $resetToken, newPassword: $newPassword)
//   }
// `;
