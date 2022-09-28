import React from 'react'
import styles from './button.module.scss'

declare interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>
{
  content?: string
  children?: string;
  onClick?: () => void
  appendIcon?: JSX.Element
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string
}

const Button: React.FC<ButtonProps> = (props) => {
  return <button
    className={props.className ? props.className : styles.primaryBtn}
    onClick={props.onClick}
    type={props.type}
  >
    { props.children || 'Nameless button' }
    { props.appendIcon }
  </button>
}

export default Button
