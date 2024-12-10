import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PrivateRoute from './guards/PrivateRoute.tsx';
import VerificationForm from "./components/register/VerificationForm.tsx";
import ResetPasswordForm from "./components/auth/ResetPasswordForm.tsx";
import HomePage from './pages/HomePage.tsx';
import Profile from './pages/Profile.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import {SearchPage} from "./pages/SearchPage.tsx";

function App() {

  return (
    <div>
    <Header />
    <BrowserRouter>
      <Routes>
	      <Route path="/verify" element={<VerificationForm />} />
	      <Route path="/reset-password" element={<ResetPasswordForm />} />
	      <Route path="/" element={<HomePage />} />
	      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
	      <Route path='/search' element={<SearchPage/>} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}

export default App
