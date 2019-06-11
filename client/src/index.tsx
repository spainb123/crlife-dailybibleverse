import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import ParseServerSideData from "./helpers/ServerSideDataRenderer";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const SSR_DATA = ParseServerSideData(document.getElementById("__CRDBV_SSR_DATA").innerText);

ReactDOM.render(
    <App data={SSR_DATA}></App>,
    document.getElementById("example")
);