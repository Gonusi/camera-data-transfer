import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

function Button({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button {...props} className={classNames(styles.button, className)}>
      {props.children}
    </button>
  );
}

export default Button;
