import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Form, Alert, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../css/resetPassword.css";
import { RESET_PASSWORD } from "../mutations/webMutations";

function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword === password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordsMatch && password && token) {
      try {
        await resetPassword({
          variables: {
            token,
            newPassword: password,
          },
          setPassword: "",
          setConfirmPassword: "",
        });
        setShowToast(true);
        navigate("/");
      } catch (err) {
        console.error("Error resetting password:", err);
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Reset Your Password</h1>
        <Form>
          <Form.Group className="form-control">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
              style={{ paddingRight: "40px" }}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className="icon"
            />
          </Form.Group>

          <Form.Group className="form-control">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{ paddingRight: "40px" }}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              onClick={toggleConfirmPasswordVisibility}
              className="icon"
            />
          </Form.Group>

          {!passwordsMatch && (
            <Alert variant="danger">Passwords do not match.</Alert>
          )}

          <Button
            variant="primary"
            onClick={(e) => handleSubmit(e)}
            disabled={!passwordsMatch}
          >
            {loading ? "Loading..." : "Reset Password"}
          </Button>

          {error && (
            <Alert variant="danger">
              {error.message.includes("Password too weak")
                ? "Password must be at least 8 characters long."
                : `An error occurred: ${error.message}`}
            </Alert>
          )}
        </Form>
      </div>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          minWidth: "200px",
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>
          Password reset successfully! Please return to the mobile application.
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default ResetPasswordForm;
