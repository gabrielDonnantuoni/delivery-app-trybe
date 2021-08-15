import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrderCard from './OrderCard';
import { request } from '../utils';

function OrdersList({ name, token, userType }) {
  const [user, setUser] = useState({});

  const uri = (userType === 'customer' ? 'purchase' : 'sale');

  useEffect(() => {
    const getSales = async () => {
      try {
        const encodedName = encodeURI(name);
        const options = {
          headers: {
            Authorization: token,
          },
          method: 'GET',
        };
        const userRequest = await request(`${uri}/${encodedName}`, options);
        setUser(userRequest);
      } catch (err) {
        console.error(err);
      }
    };
    getSales();
  }, [name, token, uri]);

  const renderCards = () => {
    const orders = (userType === 'customer' ? 'purchases' : 'sales');
    if (user[orders]) {
      return user[orders].map((order) => (
        <OrderCard
          key={ order.id }
          order={ order }
          userType={ userType }
        />));
    }
  };

  return (
    <>
      {renderCards()}
    </>);
};

OrdersList.propTypes = {
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
};

export default OrdersList;
