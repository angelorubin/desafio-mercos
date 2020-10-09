import React, { StrictMode } from "react";
import { render } from "react-dom";
import { ThemeProvider } from "@material-ui/core";
import App from "pages/app/index";
import theme from "themes/mercos";
import "index.css";
// import * as serviceWorker from './serviceWorker';

render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
