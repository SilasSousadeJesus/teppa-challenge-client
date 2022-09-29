import React, { useState } from "react";
import withPermission from "../../utils/HOC/withPermission";
import styles from "../createVehicle/createVehicle.module.scss";
import Form from "../../shared/form";
import Button from "../../shared/button";
import { useAppSelector,useAppDispatch } from "../../redux/hooks";
import { selectUser } from "../../redux/authSlice/AuthSlice";
import { newVehicle } from "../../redux/vehicleSlice/VehicleSlice";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../shared/loading/Loading";

declare interface IFormInputs {
  name: string;
  description: string;
  plate: string;
  year: number;
  color: string;
  price: number;
}
const CreateVehicle = () => {

  const CreateVehicleSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nome muito curto!")
      .required("Nome é obrigatorio")
      ,
    description: Yup.string()
      .min(2, "Descrição muito curta!")
      .max(260, "Descrição muito longa!")
      .required("A descrição é obrigatorio")
      ,
    plate: Yup.string()
    .min(8, "A placa precisa ter 8 caracteres!")
    .max(8, "A placa precisa ter maximo de 8 caracteres!")
    .required("A placa é obrigatorio!"),
    year: Yup.number()
      .min(1870, "O ano de 1870 é o ano minimo permitido!")
      .max(2022, "o ano atual é o ano maxímo permitido!")
      .typeError('O ano é obrigatorio')
      .required("O ano é obrigatorio")
      ,
    color: Yup.string().required("A cor é obrigatorio!"),
    price: Yup.number().required("O preço é  obrigatorio!")
    .typeError('O preço é Obrigatorio'),
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(CreateVehicleSchema)
  });

  const [step, setStep]  = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()
  const userState = useAppSelector(selectUser)
  const navigate = useNavigate()

  const  renderPreviousStepButton = () => {
    if(step >= 1){
      return  <Button onClick={previousStep} type='button' className={styles.btnForm}> Voltar </Button>
    } 

    if(step === 2){
        return <Button type="submit"> Cadastrar </Button>    
    }
  }
  const  renderNextStepButton = () => {
    if(step === 2){
        return <Button type="submit" className={styles.btnForm}> Cadastrar </Button>    
    }
  }
  const nextStep = () => {
    return setStep(s=> s + 1)
  }
  const previousStep = () => {
    return setStep(s=> s - 1)
  }
  const renderErros = () => {
  if(errors.name|| 
    errors.description || 
    errors.color ||
    errors.plate ||
    errors.price ||
    errors.year
    ){
      return <h4>Corrija estes campos:</h4>
    }
  }

  const onSubmit = async (data:IFormInputs) => {
    const formData = {
      data: data,
      user_id: userState.id
    }
    setLoading(true)
    await dispatch(newVehicle(formData));
    setLoading(false)
    navigate('/home')
    
  };

  if(loading){
    <Loading/>
  }

  return (
    <div className={styles.createContainer}>
      <div className={styles.wrap}>
        <div className={styles.content} data-aos="fade-right"
     data-aos-duration="1000">
          <Form title="Cadastro de Veículo"  onSubmit={handleSubmit(onSubmit)}>
                {step === 0 && (
                  <>
                  <label htmlFor="" className={styles.inputLabel}>Nome</label>
                   <input
                    placeholder="Digite um Nome  "
                    type="name"
                    id="name"
                    {...register("name")}
                  />
                  <div className={styles.erroField}>{errors.name?.message}</div>
                  
                  <label htmlFor="" className={styles.inputLabel}>Descrição</label><input
                    placeholder="Faça uma Descrição"
                    type="text"
                    id="description"
                    {...register("description")}
                  />
                     <div className={styles.erroField}>{errors.description?.message}</div>
                  </>
                )}
                {step === 1 && (
                  <>
                  <label htmlFor="" className={styles.inputLabel}>Placa</label>
                                    <input
                    placeholder="Placa do Veículo"
                    type="text"
                    id="plate"
                    {...register("plate")}
                  />
                 <div className={styles.erroField}>{errors.plate?.message}</div>
                 <label htmlFor="" className={styles.inputLabel}>Ano</label>
                  <input
                    placeholder="Ano do Veículo"
                    type="number"
                    id="year"
                    defaultValue="0"
                    {...register("year")}
                  />
                 <div className={styles.erroField}>{errors.year?.message}</div>
                  </>
                )}
                {step === 2 && (
                  <>
                  <label htmlFor="" className={styles.inputLabel}>Cor</label>
                  <input
                  placeholder="Cor do Veículo"
                  type="text"
                  id="color"
                  {...register("color")}

                />
                     <div className={styles.erroField}>{errors.color?.message}</div>
                     <label htmlFor="" className={styles.inputLabel}>Preço</label>
                <input
                  placeholder="Preço do veículo"
                  type="number"
                  id="price"
                  defaultValue="0"
                  {...register("price")}
                />
                 <div className={styles.erroField}>{errors.price?.message}</div>
                </>
                )}
                {renderPreviousStepButton()}
                {step < 2 && (<><Button onClick={nextStep} type='button' className={styles.btnForm}> Proximo </Button> </>)}
                {renderNextStepButton()}

         <div className={styles.WrapErros}>
               {renderErros()}
               <p>{errors.name?.message}</p>
                <p>{errors.description?.message}</p>
                <p>{errors.plate?.message}</p>
                <p>{errors.year?.message}</p>
                <p>{errors.color?.message}</p>
                <p>{errors.price?.message}</p>
         </div>
          </Form>
        </div>
      </div>
    </div>
  );
};


export default withPermission(["customer"])(CreateVehicle);
