import React,{ useState, useEffect } from 'react';
import { NavBar, ProductsList, ProductsCart, Loading } from '../../components';
import { lStorage } from '../../utils';

const Products = () => {
  const [subtotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(lStorage.user.get());
  }, []);

  const sumCart = () => {
    const cart = lStorage.cart.get();
    const products = Object.keys(cart);
    const sum = products.reduce((acc, product) => {
      const totalProduct = cart[product].quantity * parseFloat(cart[product].price);
      return acc + totalProduct;
    }, 0);
    return sum;
  };

  const refreshSubTotal = () => {
    const cart = lStorage.cart.get();
    if (!cart) setSubTotal(0);
    else setSubTotal(sumCart());
  };

  return (!user.token ? <Loading /> : (
    <>
      <NavBar userType="customer" userName={ user.name } />
      <ProductsCart subtotal={ subtotal } refreshCart={ refreshSubTotal } />
      <ProductsList refreshCart={ refreshSubTotal } />
    </>
  ));
};

export default Products;
