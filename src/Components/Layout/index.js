import React from 'react';
import Search from '../Search'
import Messages from '../Messages'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 25
  }
}));

function Layout() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Search />
      <Messages />
    </Container>
  );
}
 
export default Layout;
