import { createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

export function preview(props) {
    return <HelloWorldSample data={props.data} animationDuration={props.animationDuration} />;
}

export function getPreviewCss() {
    return require("./ui/Carouselcharts.css");
}
