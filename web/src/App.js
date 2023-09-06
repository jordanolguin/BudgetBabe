import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPasswordForm from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/BudgetBabe/reset-password/:token"
            element={<ResetPasswordForm />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
