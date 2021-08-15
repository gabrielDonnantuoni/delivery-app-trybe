import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { lStorage } from '../../../utils';
import { OrdersList, NavBar, Loading } from '../../../components';

const userType = 'seller';

const Orders = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(lStorage.user.get());
  }, []);

  return (!user.token ? <Loading /> : (
    <>
      <NavBar userType={ userType } userName={ user.name } />
      <OrdersList name={ user.name } token={ user.token } userType={ userType } />
    </>));
};

Orders.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default Orders;