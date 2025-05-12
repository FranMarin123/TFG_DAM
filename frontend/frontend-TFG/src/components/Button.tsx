import type { JSX } from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }): JSX.Element => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
