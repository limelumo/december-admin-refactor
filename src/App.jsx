import 'antd/dist/antd.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Accounts from './pages/accounts/accounts';
import Login from "./pages/login/Login";
import AccountDetail from "./pages/AccountDetail/AccountDetail";
import Main from './pages/Main';
import UserList from './pages/UserList/UserList';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="/account/:id" element={<AccountDetail/>}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="*" element={<div>404 Not Found</div>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
