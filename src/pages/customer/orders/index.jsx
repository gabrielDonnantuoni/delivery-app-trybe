import React from 'react';
import PropTypes from 'prop-types';
import { lStorage } from '../../../utils';
import { OrdersList, NavBar } from '../../../components';

const Orders = () => {
  const userType = 'customer';
  const savedUser = lStorage.user.get();
  const { name, token } = savedUser;
  return (
    <>
      <NavBar userType={ userType } userName={ name } />
      <OrdersList name={ name } token={ token } userType={ userType } />
    </>);
};

Orders.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default Orders;
