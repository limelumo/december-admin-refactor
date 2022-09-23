import 'antd/dist/antd.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Accounts from './pages/accounts/accounts';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accounts" element={<Accounts />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
