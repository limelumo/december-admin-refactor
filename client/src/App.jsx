import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Login from "./pages/login/Login";
import AccountDetail from "./pages/AccountDetail/AccountDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/account/:id" element={<AccountDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
