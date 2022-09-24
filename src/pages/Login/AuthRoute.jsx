import Dashboard from 'components/Dashboard';
import { Navigate } from 'react-router-dom';

const AuthRoute = () => {
  const auth = Boolean(localStorage.getItem('accessToken'));

  return auth ? <Dashboard /> : <Navigate to="/login" />;
};

export default AuthRoute;
