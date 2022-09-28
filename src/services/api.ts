import axios, { AxiosResponse } from "axios";
import { isFavoriteaVehicle, ILogin, IRegistration, IUpdateUser, IUpdateVehicle, IVehicle, UserState } from "../types/globalTypes";
import { store } from "../redux/store";

export const api = axios.create({
  baseURL:"http://localhost:5000/"
});

api.interceptors.request.use((config)=> {
    const token = store.getState().authReducer.data?.user.token
    if(token)
    config.headers!.Authorization = `Bearer ${token}`

    return config
})

// crud user
export const signup = async (registration: IRegistration): Promise<AxiosResponse> =>  {
  let url =  `/signup`
  return api.post(url, registration)
}

export const Login = async (login:ILogin): Promise<UserState> => {
  let url =  `/login`
  return await api.post(url, login)
}

export const deleteUser = async (id:string): Promise<AxiosResponse> => {
  let url =  `/user/delete/${id}`
  return api.delete(url)
}
export const editUSer = async (id:string, update:IUpdateUser): Promise<AxiosResponse> => {
  let url =  `/user/edit/${id}`
  return api.put(url, update)
}

// crud vehicles
export const getVehicles = async (id: string | undefined, query?: string): Promise<AxiosResponse> => {
    let url =  `/vehicle/listVehicle/${id}`
  if(query !== undefined){
    url += `?q=${query}`
  }
    return api.get(url)
}

export const getaVehicle = async (vehicle_id:string | undefined): Promise<AxiosResponse> => {
  let url =  `/vehicle/findVehicle/${vehicle_id}`
  return api.get(url)
}

export const createVehicles = async (user_id: string, data: IVehicle): Promise<AxiosResponse> => {
      let url =  `/vehicle/createVehicle/${user_id}`
      return api.post(url, data)                                  
}

export const ediVehicles = async (id:string | undefined, vehicle_id:string | undefined, data: IUpdateVehicle): Promise<AxiosResponse> => {
  let url =  `/vehicle/${id}/${vehicle_id}`
  return api.put(url, data) 
}

export const deleteVehicles = async (id: string | undefined, vehicle_id:string| undefined): Promise<AxiosResponse> => {
  let url =  `/vehicle/${id}/${vehicle_id}`
  return api.delete(url)                                  
}

// Favoritar veiculo
export const favoriteVehicle = async (isFavoriteVehicle: isFavoriteaVehicle):Promise<AxiosResponse> => {
  let url =  `/vehicle/isfavorite/${isFavoriteVehicle.id}/${isFavoriteVehicle.vehicle_id}`
  return api.put(url, isFavoriteVehicle) 
}
