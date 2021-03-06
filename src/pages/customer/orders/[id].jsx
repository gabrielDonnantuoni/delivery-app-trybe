import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { OrderDetails, Loading, NavBar } from '../../../components';
import { lStorage, request } from '../../../utils';

const { Header, Table, TotalPrice } = OrderDetails;

const useStyles = makeStyles(() => ({
  root: {
    padding: '30px 20px 30px',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      marginBottom: '8px',
    },
  },
}));

const userType = 'customer';

async function loadInfo(orderId, setInfo) {
  try {
    const { name: userName, token } = lStorage.user.get();
    const options = {
      headers: {
        Authorization: token,
      },
      method: 'GET',
    };
  
    const saleObj = await request(`sales/${orderId}`, options);
    const { totalPrice, saleDate: date, status, products: prods } = saleObj;
    let seller;
    if (userType === 'customer') {
      const { name: sellerName } = await request(`users/${saleObj.sellerId}`, options);
      seller = sellerName;
    }
    const products = prods.map(({ name, price, SaleProducts: { quantity } }) => ({
      name, price, quantity,
    }));
  
    setInfo({ orderId, userName, userType, totalPrice, date, status, products, seller });
  } catch (err) {
    console.error(err);
  }
}

const OrderDetailsPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const orderId = Number(router.query.id);

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});

  useEffect(() => {
    loadInfo(orderId, setInfo);
  }, [])

  useEffect(() => {
    if (info.products) setLoading(false);
  }, [info]);

  return (
    loading ? <Loading /> : (
      <>
        <NavBar userType={ userType } userName={ info.userName } />
        <Grid container className={ classes.root }>
          <Typography variant="h4">Detalhes do pedido</Typography>
          <Paper elevation={ 8 }>
            <Header info={ info } />
            <Table info={ info } />
            <TotalPrice info={ info } />
          </Paper>
        </Grid>
      </>
    )
  );
};

OrderDetailsPage.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default OrderDetailsPage;
