import React, { useState, useEffect } from 'react';
import { RegistrationByManager, NavBar, Loading } from '../../components';
import UserTable from '../../components/AdminComponents/UserTable';
import { lStorage } from '../../utils';

const AdminManage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(lStorage.user.get());
  }, []);

  return (!user.token ? <Loading /> : (
    <>
      <NavBar userType="administrator" userName={ user.name } />
      <RegistrationByManager />
      <UserTable />
    </>
  ));
};
export default AdminManage;
