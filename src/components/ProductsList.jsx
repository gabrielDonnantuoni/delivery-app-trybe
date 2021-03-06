import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { request, lStorage } from '../utils';
import ProductCard from './ProductCard';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
});

function ProductsList({ refreshCart }) {
  const [products, setProducts] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { token } = lStorage.user.get();
        const options = {
          headers: { Authorization: token },
          method: 'GET',
        };
        const result = await request('products', options);
        setProducts(result);
      } catch (err) {
        console.error(err);
      }
    };
    if (products.length === 0) getProducts();
  }, [products]);

  return (
    <div className={ classes.root }>
      { products.map((product) => (
        <ProductCard
          key={ product.id }
          product={ product }
          refreshCart={ refreshCart }
        />
      )) }
    </div>
  );
};

ProductsList.propTypes = {
  refreshCart: PropTypes.func.isRequired,
};

export default ProductsList;
