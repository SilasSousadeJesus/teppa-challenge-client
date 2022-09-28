import React from 'react'
import styles from './form.module.scss'
import { FieldValues } from "react-hook-form";
import { FormikValues } from 'formik';
declare interface FormProps extends FieldValues,  FormikValues{
    children?: React.ReactNode
    title?: string
    onSubmit?: (event: any) => void
}

const Form: React.FC<FormProps> = (props) => {
  const preventedSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit && props.onSubmit(event)
}

  return (
    <form onSubmit={preventedSubmit} className={styles.AppForm}>
    {
      props.title && <div  className={styles.Title}> <h1>{ props.title }</h1></div>
    }
    { props.children }
    </form>
  )
}

export default Form