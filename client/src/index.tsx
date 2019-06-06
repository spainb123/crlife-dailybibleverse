import * as React from "react";
import * as ReactDOM from "react-dom";

//import { Hello } from "./components/Hello";
import { App } from "./components/App";
import ParseServerSideData from "./helpers/ServerSideDataRenderer";

const SSR_DATA = decodeData();

function decodeData()
{
    return ParseServerSideData(document.getElementById("__CRDBV_SSR_DATA").innerText);
}

ReactDOM.render(
    // <Hello compiler="TypeScript" framework="React" data={SSR_DATA} />,
    <App data={SSR_DATA}></App>,
    document.getElementById("example")
);