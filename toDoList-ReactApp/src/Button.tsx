import React from 'react';
import './Button.css'

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button className="button" onClick={props.onClick}>{props.label}</button>
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
