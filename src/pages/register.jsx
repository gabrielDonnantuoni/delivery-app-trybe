import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Register } from '../components';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const RegisterPage = () => {
  const classes = useStyles();

  return (
    <Grid container className={ classes.root }>
      <Register />
    </Grid>
  );
};

export default RegisterPage;
