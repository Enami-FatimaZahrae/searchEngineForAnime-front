import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegisterForm from "./components/register/RegisterForm.tsx";
import VerificationForm from "./components/register/VerificationForm.tsx";
import ResetPasswordForm from "./components/auth/ResetPasswordForm.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/verify" element={<VerificationForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
