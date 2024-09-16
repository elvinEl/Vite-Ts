import { ButtonProps } from "../../types/Types";

const Button: React.FC<Partial<ButtonProps>> = ({
  onClick,
  children,
  className,
  disabled,
  style,
}) => {
  return (
    <button
      style={style}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
