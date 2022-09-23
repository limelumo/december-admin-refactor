import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accounts from './pages/Accounts';
import Login from './pages/Login/Login';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/account/:id" element={<Accounts />}/>
        <Route path="/users" element={<Accounts />} />
        <Route path="/user/:id" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
