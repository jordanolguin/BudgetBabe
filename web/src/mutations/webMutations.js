import { gql } from "@apollo/client";

export const WEB_SEND_PASSWORD_RESET_EMAIL = gql`
  mutation webSendPasswordResetEmail($email: String!) {
    webSendPasswordResetEmail(email: $email)
  }
`;

export const WEB_RESET_PASSWORD = gql`
  mutation webResetPassword($resetToken: String!, $newPassword: String!) {
    webResetPassword(resetToken: $resetToken, newPassword: $newPassword)
  }
`;
