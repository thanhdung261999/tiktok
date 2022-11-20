import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Button({
  to ,
  href ,
  className ,
  primary = false,
  text = false,
  disabled = false,
  rounded = false,
  outline = false,
  small = false,
  large = false,
  leftIcon = false,
  rightIcon = false,
  children,
  onClick,
  ...pastProps
}) {
  let Comp = "button";
  const props = {
    onClick,
    ...pastProps,
  };
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  Object.keys(props).forEach((key) => {
    if (key.startsWith("on") && typeof props.key === "function") {
      delete props[key];
    }
  });

  const classs = cx("wrapper", {
    [className] : className,
    primary,
    text,
    disabled,
    outline,
    rounded,
    small,
    large,
  });
  return (
    <Comp className={classs} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );

}
Button.propTypes = {
  to : PropTypes.string,
  href : PropTypes.string,
  className: PropTypes.string,
  primary : PropTypes.bool,
  text : PropTypes.bool,
  disabled : PropTypes.bool,
  rounded : PropTypes.bool,
  outline : PropTypes.bool,
  small : PropTypes.bool,
  large : PropTypes.bool,
  leftIcon : PropTypes.node,
  rightIcon : PropTypes.node,
  children : PropTypes.node.isRequired,
  onClick : PropTypes.func,
}

export default Button;
