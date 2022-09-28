import React from "react";
import styles from "./signup.module.scss";
import Button from "../../shared/button";
import Form from "../../shared/form";
import Field from "../../shared/input";
import { signup } from "../../services/api";
import { Formik, ErrorMessage } from "formik";
import { selectUser, UserRegistration  } from "../../redux/authSlice/AuthSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

declare interface values {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const authUser = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  
  const onSubmit = async (values: values, actions: any) => {
    const registration = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    const registrationSubmission = await dispatch(UserRegistration(registration))
    if( registrationSubmission.meta.requestStatus === 'fulfilled'){
      navigate('/home')
    }

  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nome curto!")
      .max(20, "Nome  muito Longo!")
      .required("Campo Obrigatório!"),
    email: Yup.string().email("Email inválido!").required("Campo Obrigatorio!"),
    password: Yup.string()
      .min(2, "Senha muito curta!")
      .required("Campo Obrigatorio!"),
  });

  return (
    <div className={styles.signupContainer}>
      <div className={authUser.token ?  styles.wrap : styles.noauthWrap}>
        <div className={styles.content} data-aos="fade-right">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            validationSchema={SignupSchema}
          >
            {({ handleSubmit, values, handleChange, errors, touched }) => (
              <Form title="Cadastre-se" onSubmit={handleSubmit}>
                <Field
                  label="Nome"
                  name="name"
                  id="name"
                  placeholder="Digite seu nome  "
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                />
                <div className={styles.erroField}>
                  <ErrorMessage name="name" />
                </div>
                <Field
                  label="Email"
                  name="email"
                  id="email"
                  placeholder="Digite um email  "
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <div className={styles.erroField}>
                  <ErrorMessage name="email" />
                </div>
                <Field
                  label="Senha"
                  name="password"
                  id="password"
                  placeholder="Digite uma senha"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <div className={styles.erroField}>
                  <ErrorMessage name="password" />
                </div>
                <Button type="submit"> Cadastrar </Button>
                <span className={styles.textLogin}>
                  <h4>
                    Já tem conta? <a href="/login">Clique e Faça login!</a>
                  </h4>
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
