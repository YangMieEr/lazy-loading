import React, { ReactElement } from "react";
import "./Item.scss";

export default function Item (props: {title: number}): ReactElement {
  return <div className="item-wrapper">
    {props.title}
  </div>;
}