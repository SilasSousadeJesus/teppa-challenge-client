import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import {selectUser} from '../../redux/authSlice/AuthSlice'
import { useAppSelector } from "../../redux/hooks";

type role = 'admin' | 'customer' | undefined

const withPermission = (roles: role[]) => (Component: FC<any>) => (props: any) => {
  const auth = useAppSelector(selectUser)
  return ( roles.includes(auth?.role) ? 
    <Component {...props} />: <Navigate to='/'/>
  )
}

export default withPermission

