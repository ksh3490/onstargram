import React from "react";
import cx from 'classnames';

import './Input.scss';

interface Iinput {
  className: string,
  type: string,
  name: string,
  label: string,
  value?: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  placeholder: string,
  err: string,
  readOnly?: boolean,
}

const Input = ({
  className,
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  err,
  readOnly,
}: Iinput) => (
  <div className={cx('Input', className)}>
    {
      label &&
      <label className="Input__label" htmlFor={name}>
        {label}
      </label>
    }
    <input
      id={name}
      type={type || 'text'}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={cx(
        'Input__input',
        { 'Input__input--err': err },
      )}
      autoComplete="off"
    />
    {
      err &&
      <p className="Input__err">{err}</p>
    }
  </div>
)

export default Input