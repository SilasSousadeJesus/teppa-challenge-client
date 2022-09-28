import React, { useState } from "react";
import Button from "../../shared/button";
import Form from "../../shared/form";
import Field from "../../shared/input";
import styles from "./userEdit.module.scss";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2'
import {userAuthentication, editAccount} from '../../redux/authSlice/AuthSlice'
import { useNavigate } from 'react-router-dom';
import { selectUser,  } from "../../redux/authSlice/AuthSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Loading from "../../shared/loading/Loading";
import withPermission from "../../utils/HOC/withPermission";


declare interface values {
  email: string;
  name: string;
}

const UserEdit = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authUser = useAppSelector(selectUser)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch()
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
 

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nome curto!")
      .max(20, "Nome  muito Longo!"),
    email: Yup.string().email("Email inválido!")
  });

  const onSubmit = async (values: values, actions: any) => {

        const dataEditUser = {
          id:authUser.id,
          update:values
        };
        setLoading(true)
         await dispatch(editAccount(dataEditUser))
         setLoading(false)
          navigate('/myinfo')
  };

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
              name: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values, handleChange }) => (
              <Form title="Edição de Perfil" onSubmit={handleSubmit}>
                <Field
                  label="Email"
                  placeholder="Digite o novo email  "
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
                  label="Nome"
                  placeholder="Digite o novo nome"
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <div className={styles.erroField}>
                  <ErrorMessage name="name" />
                </div>
                <Button type="submit"> Editar </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default withPermission(['customer']) (UserEdit)