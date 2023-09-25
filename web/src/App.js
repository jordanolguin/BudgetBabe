import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ResetPasswordForm from "./components/ResetPassword";
import Home from "./components/Home";
import "./index.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:token" element={<ResetPasswordForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
