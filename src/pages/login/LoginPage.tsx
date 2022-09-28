import React, { useState } from "react";
import Button from "../../shared/button";
import Form from "../../shared/form";
import Field from "../../shared/input";
import styles from "./loginPage.module.scss";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2'
import {userAuthentication} from '../../redux/authSlice/AuthSlice'
import { useNavigate } from 'react-router-dom';
import { selectUser,  } from "../../redux/authSlice/AuthSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Loading from "../../shared/loading/Loading";


declare interface values {
  email: string;
  password: string;
}

const loginPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authUser = useAppSelector(selectUser)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch()
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
 

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido!").required("Campo Obrigatorio!"),
    password: Yup.string()
      .min(2, "Senha muito curta!")
      .required("Campo Obrigatorio!"),
  });

  const onSubmit = async (values: values, actions: any) => {
 
        const login = {
          email: values.email,
          password: values.password,
        };
         await dispatch(userAuthentication(login))
         if(authUser){
          navigate('/home')
         }
  };

  // data-aos="fade-up"
  // data-aos-duration="1000"

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.loginContainer }>
      <div className={authUser.token ?  styles.wrap : styles.noauthWrap}>
        <div className={styles.content} data-aos="fade-right">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values, handleChange }) => (
              <Form title="Login" onSubmit={handleSubmit}>
                <Field
                  label="Email"
                  placeholder="Digite o email  "
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <div className={styles.erroField}>
                  <ErrorMessage name="email" />
                </div>
                <Field
                  label="Senha"
                  placeholder="Digite a senha"
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <div className={styles.erroField}>
                  <ErrorMessage name="password" />
                </div>
                <Button type="submit"> Login </Button>
                <span className={styles.textSignup}>
                  <h4>
                    Não tem conta? <a href="/signup">Clique e Cadastre-se!</a>
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

export default loginPage;

