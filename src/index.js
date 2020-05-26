import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

import store from './Store'

import './index.css';
import Layout from './Components/Layout';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});


ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Layout />
      </Provider>
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
