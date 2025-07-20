import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import BioForm from './components/bio-form';
import PrivateRoute from './Auth/PrivateRoute';
import Signup from './pages/SignUp';

function App() {
  return (
 <BrowserRouter>
      <Routes>
           <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/bio-form"
          element={
            <PrivateRoute>
              <BioForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
