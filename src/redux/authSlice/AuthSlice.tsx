import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store'; 
import {UserState} from '../../types/globalTypes';
import {Login, signup, deleteUser, editUSer} from '../../services/api'
import {ILogin, IRegistration, IDataEditUser} from '../../types/globalTypes'
import Swal from 'sweetalert2'
const initialState: UserState = {
  data:{
    user: {
      id:'',
      email: '',
      name:'',
      token:'',
      role: undefined,
    }
  }
}

export const UserRegistration = createAsyncThunk(
    'auth/Signup',
    async (registration: IRegistration) => {
     const response = await signup(registration);
     return response.data;
    }
);
export const userAuthentication = createAsyncThunk(
    'auth/Login',
    async (login: ILogin) => {
     const response = await Login(login);
     const user = response
      return user;
    }
);
export const userlogout = createAsyncThunk(
    'auth/Logout',
    async () => {
      const emptyUser = {
        data:{
          user: {
            id:'',
            email: '',
            name:'',
            token:'',
            role: undefined,
          }
        }
      }
      return emptyUser;
    }
);
export const deleteAccount = createAsyncThunk(
  'auth/deleteUser',
  async (id:string) => {
   const response = await deleteUser(id);
   return response;
  }
);
export const editAccount = createAsyncThunk(
  'auth/editUSer',
  async (dataEditUser:IDataEditUser) => {
   const response = await editUSer(dataEditUser.id, dataEditUser.update);
   const user = response
   return user;
  }
);
const showErrorAlertSignup =
(status:string | undefined) => {
  if(status){
    var statuCode = status.split(' ')[5];
    if(statuCode === '422'){
      const errorMessage = 'Este email já esta em uso!'
      return Swal.fire('Oops!', errorMessage , 'error')
    }
    if(statuCode === '401'){
      const errorMessage = 'Campos obrigatórios vazios'
      return Swal.fire('Oops!', errorMessage , 'error')
    }
    return Swal.fire('Oops!', 'Error no servidor, tente mais tarde!' , 'error')
  }
}
const showErrorAlertLogin =
(status:string | undefined) => {
  if(status){
    var statuCode = status.split(' ')[5];
    if(statuCode === '401'){
      const errorMessage = 'Email ou Senha Invalida!'
      return Swal.fire('Oops!', errorMessage , 'error')
    }
    return Swal.fire('Oops!', 'Error no servidor, tente mais tarde!' , 'error')
  }
}
const showErrorAlertdeleteAccount =
(status:string | undefined) => {
  if(status){
    var statuCode = status.split(' ')[5];
    if(statuCode === '401'){
      const errorMessage = 'Ação não autorizada, contate o suporte'
      return Swal.fire('Oops!', errorMessage , 'error')
    }
    return Swal.fire('Oops!', 'Error no servidor, tente mais tarde!' , 'error')
  }
}
const showErrorAlertEditAccount =
(status:string | undefined) => {
  if(status){
    var statuCode = status.split(' ')[5];
    if(statuCode === '401'){
      const errorMessage = 'Ação não autorizada, contate o suporte'
      return Swal.fire('Oops!', errorMessage , 'error')
    }
    if(statuCode === '422'){
      const errorMessage = 'Este Email já esta em uso.'
      return Swal.fire('Oops!', errorMessage , 'error')
    }
    return Swal.fire('Oops!', 'Error no servidor, tente mais tarde!' , 'error')
  }
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
      .addCase(userAuthentication.pending, (state) => {
        return state
      })
      .addCase(userAuthentication.fulfilled, (state, action) => {
        state.data = action.payload.data
      })
      .addCase(userAuthentication.rejected, (state, action) => {
        const status = action.error.message
        showErrorAlertLogin(status)
        return state
      });

        builder
      .addCase(userlogout.pending, (state) => {
        return state
      })
      .addCase(userlogout.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(userlogout.rejected, (state, action) => {
        return state
      });

        builder
      .addCase(UserRegistration.pending, (state) => {
        return state
      })
      .addCase(UserRegistration.fulfilled, (state, action) => {
        return state 
      })
      .addCase(UserRegistration.rejected, (state, action) => {
        const status = action.error.message
        showErrorAlertSignup(status)
        return state
      });

        builder
      .addCase(deleteAccount.pending, (state) => {
        return state
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        return state 
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        const status = action.error.message
        showErrorAlertdeleteAccount(status)
        return state
      });

        builder
      .addCase(editAccount.pending, (state) => {
        return state
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        console.log(action.payload.data )
         state.data = action.payload.data 
      })
      .addCase(editAccount.rejected, (state, action) => {
        const status = action.error.message
        showErrorAlertEditAccount(status)
        return state
      });
    },

})

export const selectUser = (state: RootState) => state.authReducer.data.user;

export default authSlice.reducer;