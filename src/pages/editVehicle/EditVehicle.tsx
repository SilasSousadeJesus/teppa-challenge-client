import React,  {useEffect, useState} from 'react'
import Button from '../../shared/button'
import Form from '../../shared/form'
import withPermission from '../../utils/HOC/withPermission'
import styles from './editVehicle.module.scss'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../shared/loading/Loading";
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { selectUser } from '../../redux/authSlice/AuthSlice'
import { editVehicle } from "../../redux/vehicleSlice/VehicleSlice";
import { getaVehicle } from "../../services/api";
import { IVehicle } from '../../types/globalTypes'

declare interface IFormInputs {
  name: string;
  description: string;
  plate: string;
  year: number;
  color: string;
  price: number;
}


const EditVehicle = () => {

  const [step, setStep]  = useState<number>(0);
  const [vehicle, setVehicle] = useState<IVehicle>()
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()
  const userState = useAppSelector(selectUser)
  const navigate = useNavigate()
  const {vehicle_id} = useParams()


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const vehicleState = await getaVehicle(vehicle_id)
    setLoading(false);
    return setVehicle(vehicleState.data);
  };
  const editVehicleSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nome muito curto!")
      .required("Nome é Obrigatorio"),
    description: Yup.string()
      .min(2, "Descrição muito curta!")
      .max(260, "Descrição muito longa!")
      .required("A descrião é Obrigatorio"),
    plate: Yup.string()
      .min(8, "A placa precisa ter 8 caracteres!")
      .max(8, "A placa precisa ter maximo de 8 caracteres!")
      .required("A placa é Obrigatoria!"),
    year: Yup.number()
      .min(1870, "O ano de 1870 é o ano minimo permitido!")
      .max(2022, "o ano atual é o ano maxímo permitido!")
      .typeError('O ano é Obrigatorio')
      .required("O ano é Obrigatorio")
      .required("A descrião é Obrigatorio"),
    color: Yup.string().required("a cor é Obrigatorio!"),
    price: Yup.number().required("O preço é  Obrigatorio!")
    .typeError('O preço é Obrigatorio'),
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(editVehicleSchema)
  });

  const onSubmit = async (data:IFormInputs) => {
    const dataForm = {
      id: userState.id,
      vehicle_id: vehicle_id,
      data
    }

    setLoading(true)
    await dispatch(editVehicle(dataForm));
    setLoading(false)
    navigate('/home')
    
  };

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
      return <h3>Corrija estes campos:</h3>
    }
  }

  if(loading){
    <Loading/>
  }
  return (
    <div className={styles.createContainer}>
    <div className={styles.wrap}>
      <div className={styles.content} data-aos="fade-right" >
        <Form title="Edição de Veículo"  onSubmit={handleSubmit(onSubmit)}>
              {step === 0 && (
                <>
                <div className={styles.stepsStyles}>Etapa 1/3</div>
                 <input
                  placeholder="Digite um Nome  "
                  type="name"
                  id="name"
                  defaultValue={vehicle?.name}
                  {...register("name")}
                />
                <div className={styles.erroField}>{errors.name?.message}</div>
                <input
                  placeholder="Faça uma Descrição"
                  type="text"
                  id="description"
                  defaultValue={vehicle?.description}
                  {...register("description")}
                />
                   <div className={styles.erroField}>{errors.description?.message}</div>
                </>
              )}
              {step === 1 && (
                <>
                <div className={styles.stepsStyles}>Etapa 2/3</div>
                                  <input
                  placeholder="Placa do Veículo"
                  type="text"
                  id="plate"
                  defaultValue={vehicle?.plate}
                  {...register("plate")}
                />
               <div className={styles.erroField}>{errors.plate?.message}</div>
                <input
                  placeholder="Ano do Veículo"
                  type="number"
                  id="year"
                  defaultValue={vehicle?.year}
                  {...register("year")}
                />
               <div className={styles.erroField}>{errors.year?.message}</div>
                </>
              )}
              {step === 2 && (
                <>
                <div className={styles.stepsStyles}>Etapa 3/3</div>
                <input
                placeholder="Cor do Veículo"
                type="text"
                id="color"
                defaultValue={vehicle?.color}
                {...register("color")}

              />
                   <div className={styles.erroField}>{errors.color?.message}</div>
              <input
                placeholder="Preço do veículo"
                type="number"
                id="price"
                defaultValue={vehicle?.price}
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
  )
}

export default withPermission(['customer']) (EditVehicle)