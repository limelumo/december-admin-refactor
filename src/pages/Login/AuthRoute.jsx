import { Navigate } from 'react-router-dom';
import Dashboard from 'components/Dashboard';

const AuthRoute = () => {
  const auth = Boolean(localStorage.getItem('accessToken'));

  return auth ? <Dashboard /> : <Navigate to="/login" />;
};

export default AuthRoute;
