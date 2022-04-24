import React from "react";
import cx from 'classnames';

import './Button.scss';

interface Ibutton {
  className: string,
  title: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  icon?: string,
  disabled?: boolean,
}

const Button = ({
  className,
  title,
  onClick,
  icon,
  disabled,
}: Ibutton) => {
  const iconStyle = {
    paddingLeft: '18px',
    background: `left / 12px no-repeat url('/images/${icon}')`,
  }

  return (
    <button
      className={cx('Button', className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span style={icon && iconStyle}>
        {title}
      </span>
    </button>
  )
}

export default Button