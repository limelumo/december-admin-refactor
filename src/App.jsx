import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accounts from './pages/Accounts';
import Login from './pages/Login';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accounts />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;