/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useMainContext } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
}));

export default function OrderCard({ order, userType }) {
  const classes = useStyles();
  const router = useRouter();
  const { socket } = useMainContext();

  const {
    deliveryAddress,
    deliveryNumber,
    id,
    saleDate,
    status: initialStatus,
    totalPrice,
  } = order;

  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    socket.on('updateOrder-client', ({ id: orderId, newStatus }) => {
      if (id === orderId) {
        setStatus(newStatus);
      }
    });
  }, [socket, id]);

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('pt-br');
  };

  const redirectToSaleDetail = (idParam) => {
    router.push(`/${userType}/orders/${idParam}`);
  };

  const renderDescription = () => (
    <Grid item xs={ 12 } sm container>
      <Grid item xs container direction="column" spacing={ 2 }>
        <Grid item xs>
          <Typography
            data-testid={ `${userType}_orders__element-delivery-status-${id}` }
            variant="subtitle1"
          >
            {status}
          </Typography>
          <Typography
            data-testid={ `${userType}_orders__element-order-date-${id}` }
            variant="body2"
          >
            {formatDate(saleDate)}
          </Typography>
          <Typography
            data-testid={ `${userType}_orders__element-card-address-${id}` }
            variant="body2"
            color="textSecondary"
          >
            {`${deliveryAddress}, ${deliveryNumber}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          data-testid={ `${userType}_orders__element-card-price-${id}` }
          variant="subtitle1"
        >
          {`R$ ${totalPrice.replace(/\./, ',')}`}
        </Typography>
      </Grid>
    </Grid>);

  return (

    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <Grid container spacing={ 2 } onClick={ () => redirectToSaleDetail(id) }>
          <Grid
            item
            data-testid={ `${userType}_orders__element-order-id-${id}` }
          >
            {`Pedido ${id}`}
          </Grid>
          {renderDescription()}
        </Grid>
      </Paper>
    </div>
  );
}

OrderCard.propTypes = {
  userType: PropTypes.string.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
};
