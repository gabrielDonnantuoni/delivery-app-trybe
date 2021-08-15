import React, { useState, useEffect } from 'react';
import { NavBar, Checkout, Loading } from '../../components';
import { lStorage } from '../../utils';

function CheckoutPage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(lStorage.user.get());
  }, []);

  return (!user.token ? <Loading /> : (
    <>
      <NavBar userType="customer" userName={ user.name } />
      <Checkout />
    </>
  ));
};

export default CheckoutPage;
