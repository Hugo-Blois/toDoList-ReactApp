import React, { ReactNode } from 'react';
import './Button.css'

interface ButtonProps {
  label: string;
  onClick: () => void;
  children: ReactNode; // Utilisez ReactNode pour accepter n'importe quel type d'enfant
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button className="button" onClick={props.onClick}>
      {props.label}
      {props.children}
      </button>
  );
};

//manière prof
/*
type Props = {
  onClick?: () => void;
} & PropsWithChildren;


const ButtonProf: FunctionComponent<Props> = (props: Props) => {
  return(
    <button className='button' onClick={ props.onClick }>{props.children}</button>
  )
}*/

export default Button;
