import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

const SSR_DATA = document.getElementById("__CRDBV_SSR_DATA").innerText;

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" data={SSR_DATA} />,
    document.getElementById("example")
);