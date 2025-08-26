import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/Carouselcharts.css";

export function Carouselcharts(props) {
    return <HelloWorldSample data={props.data} animationDuration={props.animationDuration}/>;
}
