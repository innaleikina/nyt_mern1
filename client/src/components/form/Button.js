import React from "react";

export const Button = props => (
  <button {...props} className="btn">
    {props.children}
  </button>
);
