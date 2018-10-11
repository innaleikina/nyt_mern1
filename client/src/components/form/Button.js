import React from "react";

export const Button = props => (
  <button {...props} className="btn-form">
    {props.children}
  </button>
);
