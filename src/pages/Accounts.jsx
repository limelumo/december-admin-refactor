import React, { useEffect } from 'react';
import accountsAPI from '../apis/accountAPI';
import Dashboard from '../components/Dashboard';

const Accounts = () => {
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await accountsAPI.getAllAccount('/accounts');
        return res;
      } catch (error) {
        console.error(error);
      }
    };
    const res = fetch();
  }, []);

  return (
    <Dashboard>
      <div>Admin</div>
    </Dashboard>
  );
};

export default Accounts;
