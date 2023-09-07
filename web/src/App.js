import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPasswordForm from "./components/ResetPassword";

function App() {
  return (
    <>
      <Router basename="/BudgetBabe">
        <Routes>
          <Route path="/:token" element={<ResetPasswordForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
