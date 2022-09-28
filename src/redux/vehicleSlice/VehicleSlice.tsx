import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store'; 
import {isFavoriteaVehicle, IVehicle} from '../../types/globalTypes';
import {createVehicles, deleteVehicles, ediVehicles, favoriteVehicle, getVehicles} from '../../services/api'
import Swal from 'sweetalert2';


const initialState: IVehicle[] = []
declare interface ISearches  {
  id:string,
  query?:string
}
declare interface formVehicle {
  user_id:string
  data:IVehicle
}

declare interface IUserandVehicle {
  id: string,
  vehicle_id:string | undefined
}

declare interface IdataUpdateVehicle {
  id: string,
  vehicle_id:string | undefined,
  data:IVehicle
}

const showErrorAlert =
() => {
    return Swal.fire('Oops!', 'Error no servidor, tente mais tarde!' , 'error')
  }


export const GetAllVehicles = createAsyncThunk(
    'vehicle/getVehicles',
    async (searches:ISearches) => {
     const response = await getVehicles(searches.id, searches?.query);
     return response.data;
    }
);
export const newVehicle = createAsyncThunk(
    'vehicle/createVehicles',
    async (formData: formVehicle) => {
     await createVehicles(formData.user_id, formData.data);
     await getVehicles(formData.user_id)
    }
);
export const deleteVehicle = createAsyncThunk(
    'vehicle/deleteVehicles',
    async (data: IUserandVehicle) => {
     await deleteVehicles(data.id, data.vehicle_id);
     await getVehicles(data.id)
    }
);
export const editVehicle = createAsyncThunk(
    'vehicle/editVehicle',
    async (data:IdataUpdateVehicle ) => {
     await ediVehicles(data.id, data.vehicle_id, data.data);
     await getVehicles(data.id)
    }
);
export const favoriteMyVehicle = createAsyncThunk(
    'vehicle/favoriteVehicle',
    async (isFavoriteVehicle:isFavoriteaVehicle ) => {
     await favoriteVehicle(isFavoriteVehicle);
    }
);

export const VehicleSlice = createSlice({
    name:'vehicle',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
      .addCase(GetAllVehicles.pending, (state) => {
        return state 
      })
      .addCase(GetAllVehicles.fulfilled, (state, action) => {
        return state = action.payload
      })
      .addCase(GetAllVehicles.rejected, (state) => {
        showErrorAlert()
        return state
      });

        builder
      .addCase(newVehicle.pending, (state) => {
        return state 
      })
      .addCase(newVehicle.fulfilled, (state, action) => {
        return state
      })
      .addCase(newVehicle.rejected, (state) => {
        showErrorAlert()
        return state
      });

        builder
      .addCase(deleteVehicle.pending, (state) => {
        return state 
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        return state
      })
      .addCase(deleteVehicle.rejected, (state) => {
        showErrorAlert()
        return state
      });

        builder
      .addCase(editVehicle.pending, (state) => {
        return state 
      })
      .addCase(editVehicle.fulfilled, (state, action) => {
        return state
      })
      .addCase(editVehicle.rejected, (state) => {
        showErrorAlert()
        return state
      });


      builder
      .addCase(favoriteMyVehicle.pending, (state) => {
        return state 
      })
      .addCase(favoriteMyVehicle.fulfilled, (state, action) => {
        return state
      })
      .addCase(favoriteMyVehicle.rejected, (state) => {
        showErrorAlert()
        return state
      });



    },

})

export const selectVehicle = (state: RootState) => state.vehicleReducer
export default VehicleSlice.reducer;