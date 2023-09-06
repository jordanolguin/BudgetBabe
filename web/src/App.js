import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPasswordForm from "./components/ResetPassword";

function App() {
  return (
    <Router basename="/BudgetBabe">
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
