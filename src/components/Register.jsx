import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import Img from 'next/image';
import { isValidUserForRegistration, request, getPathByRole, lStorage } from '../utils';
import TransitionAlerts from './TransitionAlerts';
import logo from '../../public/images/on_the_way.svg';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    maxWidth: '560px',
    display: 'flex',
    marginInline: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.form,
    '& > *': {
      margin: theme.spacing(2),
    },
    '& > div + div': {
      marginTop: theme.spacing(0),
    },
    '& > button:first-of-type': {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    '& > :last-child': {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function Register() {
  const classes = useStyles();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setDisable(!isValidUserForRegistration(name, email, password));
  }, [name, email, password]);

  useEffect(() => {
    if (errorMessage) setOpen(true);
  }, [errorMessage]);

  const handleChange = (callback, event) => {
    callback(event.target.value);
  };

  const handleClick = async (event) => {
    try {
      event.preventDefault();
      const options = {
        body: {
          name,
          email,
          password,
          role: 'customer',
        },
        method: 'POST',
      };
      const { token, message } = await request('register', options);
  
      if (!message) {
        const user = {
          name,
          email,
          role: 'customer',
          token,
        };
        lStorage.user.set(user);
        const homePage = getPathByRole(user.role);
        router.push(homePage);
      } else {
        setErrorMessage(message);
        setOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderErrorMessage = () => (
    <TransitionAlerts
      message={ errorMessage }
      open={ { value: open, set: setOpen } }
      testId="common_register__element-invalid_register"
      severity="warning"
    />
  );

  return (
    <>
      <Grid className={ classes.root } item xs={ 11 } sm={ 8 } md={ 6 } lg={ 4 }>
        <Paper component="form" elevation={ 8 } className={ classes.form }>
          <div>
            <Img src={ logo } alt="logo" />
          </div>
          <TextField
            type="text"
            value={ name }
            inputProps={ { 'data-testid': 'common_register__input-name' } }
            label="Nome"
            variant="outlined"
            onChange={ (event) => handleChange(setName, event) }
            margin="dense"
          />
          <TextField
            type="text"
            value={ email }
            inputProps={ { 'data-testid': 'common_register__input-email' } }
            label="Email"
            variant="outlined"
            onChange={ (event) => handleChange(setEmail, event) }
            margin="dense"
          />
          <TextField
            type="password"
            value={ password }
            inputProps={ { 'data-testid': 'common_register__input-password' } }
            label="Senha"
            variant="outlined"
            onChange={ (event) => handleChange(setPassword, event) }
            margin="dense"
          />
          <Button
            type="button"
            data-testid="common_register__button-register"
            variant="contained"
            color="primary"
            disabled={ isDisabled }
            onClick={ handleClick }
          >
            Cadastrar
          </Button>
        </Paper>
      </Grid>
      {renderErrorMessage()}
    </>
  );
}
