import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | undefined;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Button;
