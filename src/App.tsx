import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegisterForm from "./components/register/RegisterForm.tsx";
import VerificationForm from "./components/register/VerificationForm.tsx";
import ResetPasswordForm from "./components/auth/ResetPasswordForm.tsx";
import HomePage from './pages/HomePage.tsx';
import Profile from './pages/Profile.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import PrivateRoute from './guards/PrivateRoute.tsx';

function App() {

  return (
    <div>
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/verify" element={<VerificationForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />;
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
