import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ResetPasswordForm from "./components/ResetPassword";

function App() {
  return (
    <Router basename="/BudgetBabe">
      <div>
        <Routes>
          <Route path="/:token" element={<ResetPasswordForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
