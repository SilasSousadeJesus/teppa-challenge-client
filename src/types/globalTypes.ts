export interface ILogin {
  email: string;
  password: string;
}
export interface IUpdateUser {
  email?: string;
  name?: string;
}
export interface  IDataEditUser{
  id:string,
  update:IUpdateUser
}
export interface isFavoriteaVehicle {
  id:string | undefined, 
  vehicle_id:string| undefined, 
  isFavorite:  boolean | undefined
}
export interface IVehicle {
  user_id?: string;
  _id?: string;
  name: string;
  description: string;
  plate: string;
  isFavorite?: boolean;
  year: number;
  color: string;
  price: number;
}
export interface IUpdateVehicle {
  name: string;
  description?: string;
  plate?: string;
  isFavorite?: boolean;
  year?: number;
  color?: string;
  price?: number;
}
export interface IRegistration {
  name: string;
  email: string;
  password: string;
}
export interface UserState  {
  data:{
    user: {
      id:string
      email: string
      name:string
      token:string
      role:'admin' | 'customer' | undefined
    }
  }
}
export interface VehicleState {
  _id:string,
  year:number,
  user_id:string,
  price:number,
  plate:string,
  name:string,
  isFavorite:boolean,
  description:string,
  color:string,
}