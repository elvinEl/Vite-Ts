import { InputProps } from "../../types/Types";

const Input: React.FC<Partial<InputProps>> = ({
  value,
  type,
  id,
  name,
  onChange,
  placeholder,
  className,
  required,
  disabled,
  tabIndex,
  autoComplete,
  checked,
}) => {
  return (
    <input
      value={value}
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      required={required}
      disabled={disabled}
      tabIndex={tabIndex}
      autoComplete={autoComplete}
      checked={checked}
    />
  );
};

export default Input;
