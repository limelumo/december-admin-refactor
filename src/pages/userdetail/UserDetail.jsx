import { Navigate, useParams } from 'react-router-dom';

import AccountListSection from './components/AccountListSection';
import UserInfoSection from './components/UserInfoSection';

const UserDetail = () => {
  const { user_id } = useParams();

  if (!user_id) {
    <Navigate to="/" />;
  }

  return (
    <>
      <UserInfoSection userId={user_id} />
      <AccountListSection userId={user_id} />
    </>
  );
};

export default UserDetail;
