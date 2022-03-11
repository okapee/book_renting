import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);
// import { StrictMode } from "react";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);