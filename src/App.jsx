import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AccountDetail from './pages/AccountDetail/AccountDetail';
import Accounts from './pages/accounts/accounts';
import AuthRoute from './pages/Login/AuthRoute';
import Login from './pages/Login/Login';
import UserDetail from './pages/userdetail/UserDetail';
import Users from './pages/Users/Users';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Accounts />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/account/:id" element={<AccountDetail />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:user_id" element={<UserDetail />} />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
