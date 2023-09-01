import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { WEB_RESET_PASSWORD } from "../mutations/webMutations";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [webResetPassword, { loading, error, data }] =
    useMutation(WEB_RESET_PASSWORD);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await webResetPassword({
          variables: {
            resetToken: "Your reset token",
            newPassword: password,
          },
        });

        if (response && response.data && response.data.resetPassword) {
          alert("Password reset successfully!");
        } else {
          alert("Password reset failed.");
        }
      } catch (err) {
        console.error("An error occured:", err);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occured: {error.message}</p>;
  }

  if (data && data.resetPassword) {
    return <p>Password reset successfully!</p>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>New Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            variant="outline-secondary"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </Button>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
        <Form.Label>Confirm New Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Button
            variant="outline-secondary"
            onClick={toggleConfirmPasswordVisibility}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
          </Button>
        </InputGroup>
        {!passwordsMatch && (
          <Form.Text className="text-muted">Passwords do not match.</Form.Text>
        )}
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!passwordsMatch}>
        Reset Password
      </Button>
    </Form>
  );
}

export default ResetPasswordForm;
