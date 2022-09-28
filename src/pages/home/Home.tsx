import React, { useEffect, useState } from "react";
import Button from "../../shared/button";
import Select from "../../shared/select";
import Search from "../../shared/search";
import styles from "./home.module.scss";
import Card from "../../shared/card";
import Loading from "../../shared/loading/Loading";
import { IVehicle } from "../../types/globalTypes";
import { Link, useNavigate } from "react-router-dom";
import withPermission from "../../utils/HOC/withPermission";
import { selectUser,  } from "../../redux/authSlice/AuthSlice";
import { deleteVehicle, favoriteMyVehicle, GetAllVehicles} from "../../redux/vehicleSlice/VehicleSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Home = () => {
  const [loadingComponent, setLoadingComponent] = useState(false);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [query, setQuery] = useState('');
  const [filterfavorite, setFilterFavorite] = useState<string | undefined>('all')
  const authUser = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const userState = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    ( async ()=> await loadData()) ()
  }, [filterfavorite]);

  const loadData = async (query?:string) => {
    const searches = {
      id: authUser.id,
      query: query
    }

    const vehicleState = await dispatch(GetAllVehicles(searches))

    if(filterfavorite === 'all'){

      const vehicleState = await dispatch(GetAllVehicles(searches))

      return setVehicles(vehicleState.payload)
    }
    if(filterfavorite === 'favorite'){

      const datafilter = vehicleState.payload.filter((vehicle:IVehicle) => vehicle.isFavorite === true && vehicle.user_id === userState.id )

      return setVehicles(datafilter)
    }

    return setVehicles(vehicleState.payload);
   
  };

  const handleSearch = async (query: string): Promise<void> => {
    await loadData(query)
  };

  const handleClear = async():Promise<void>=> {
    await loadData(query)
  }

  const handleFavorite = async (vehicle_id: string | undefined, isFavorite:boolean | undefined) => {
    
    const isFavoriteVehicle = {
       id: authUser.id,
       vehicle_id: vehicle_id, 
       isFavorite: !isFavorite
    }
    setLoadingComponent(true)
    await  dispatch(favoriteMyVehicle(isFavoriteVehicle)) ;
    await  loadData();
    setLoadingComponent(false)
  };

  const handleDelete = async (
    vehicle_id: string | undefined,
  ) => {
    const data = {
      id:userState.id,
      vehicle_id: vehicle_id
    }
    setLoadingComponent(true)
    await dispatch(deleteVehicle(data))
    await  loadData();
    setLoadingComponent(false)
  };

  const handleEdit = async (id:string | undefined )  => {
    navigate(`/editVehicle/${id}`)
  }
  
  if (loadingComponent) {
    return <Loading />;
  }
  return (
    <div className={styles.homeContainer}>
      <div className={styles.wrap}>

        <div className={styles.searchWrap} data-aos="fade-right">
          <Search
            onSearch={handleSearch}
            placeholder="nome, descrição, cor ou placa."
            onClear={handleClear}
            onSubmit={()=> handleSearch}
          />
          <div className={styles.addandSelect}>
          <Link to='/createVehicle'><Button className={styles.addBtn}> Adicionar Veiculo</Button></Link>
          <Select onChange={(e) =>  setFilterFavorite(e?.currentTarget.value)} value={filterfavorite}/>
          </div>
        </div>

        <div className={styles.wrapCards}>
          <div className={styles.content}  >
            {vehicles.map((vehicle, i) => (
                <Card title={vehicle.name} key={i}  favorite={vehicle.isFavorite} isFavorite={()=> handleFavorite(vehicle._id, vehicle.isFavorite)}  onDelete={()=> handleDelete(vehicle._id)} onEdit={()=> handleEdit(vehicle._id)} >
                  <p >
                    <span className={styles.nameField}>Descrição:</span>{" "}
                    {vehicle.description}
                  </p>

                  <p>
                    <span className={styles.nameField}>Placa:</span>{" "}
                    {vehicle.plate}
                  </p>
                  <p>
                    <span className={styles.nameField}>Preço:</span>
                    {vehicle.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>
                    <span className={styles.nameField}>Ano:</span>{" "}
                    {vehicle.year}
                  </p>
                  <p>
                    <span className={styles.nameField}>Cor:</span>{" "}
                    {vehicle.color}
                  </p>
                </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default withPermission(['customer']) (Home);
