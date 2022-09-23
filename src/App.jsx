import 'antd/dist/antd.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Accounts from './pages/accounts/accounts';

import { QueryClient, QueryClientProvider } from 'react-query';

import Main from './pages/Main';
import UserList from './pages/UserList/UserList';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="*" element={<div>404 Not Found</div>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
