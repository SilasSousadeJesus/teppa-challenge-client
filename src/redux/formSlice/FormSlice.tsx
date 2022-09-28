import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store'; 


declare interface FormState {
  name: string;
  description: string;
  plate: string;
  year: number;
  color: string;
  price: number;
}


const initialState: FormState = {
  name: '',
  description: '',
  plate: '',
  year: 0,
  color: '',
  price: 0
}

export const FormSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
      firstStep: (state, payload) => {
        const { name, description  } = payload.payload 
        state.name = name
        state.description = description
      },
      secondStep: (state, payload) => {
        const { plate, year  } = payload.payload 
        state.plate = plate
        state.year = year
      },
      thirdStep: (state, payload) => {
        const { color, description  } = payload.payload 
        state.color = color
        state.description = description
      }
    },
})
export const { firstStep, secondStep, thirdStep } = FormSlice.actions;

export const selectForm = (state: RootState) => state.formReducer
export default FormSlice.reducer;