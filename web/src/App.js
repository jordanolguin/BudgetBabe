import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPasswordForm from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
