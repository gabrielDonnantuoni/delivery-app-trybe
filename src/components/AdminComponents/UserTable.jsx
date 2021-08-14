import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { lStorage, request } from '../../utils';
import { MyTableHead, MyTableBody } from '.';
import { useMainContext } from '../../hooks';

const useStyles = makeStyles(() => ({
  root: {
    padding: '6px',
  },
}));

function UserTable() {
  const { oscillator } = useMainContext();
  const classes = useStyles();
  const [users, setUser] = useState(null);

  const savedUser = lStorage.user.get();
  const { token } = savedUser;

  useEffect(() => {
    const getUsers = async () => {
      const options = {
        headers: {
          Authorization: token,
        },
        method: 'GET',
      };
      const userRequest = await request('users/all', options);
      setUser(userRequest);
    };
    getUsers();
  }, [oscillator.value]);

  const removeUser = (id) => {
    const options = {
      headers: {
        Authorization: token,
      },
      method: 'DELETE',
    };
    oscillator.set(!oscillator.value);
    return request(`users/${id}`, options);
  };

  const renderBody = () => {
    if (users) {
      // const withoutAdmin = users.map(({ role }) => role !== 'administrator');
      return (
        <MyTableBody users={ users } removeUser={ removeUser } />);
    }
  };

  return (
    <Grid container className={ classes.root }>
      <Table>
        <MyTableHead />
        {renderBody()}
      </Table>
    </Grid>
  );
};

export default UserTable;
