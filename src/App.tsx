import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
