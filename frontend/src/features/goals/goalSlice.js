import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from './goalService';

// Get goals from localStorage
const goals = JSON.parse(localStorage.getItem('goals'));

const initialState = {
  goals: goals ? goals : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new goal
export const createGoal = createAsyncThunk('goals/create',
  async (goal, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await goalService.createGoal(goal, token);
    } catch (error) {
      const message = (
        (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// Get use goals
export const getGoals = createAsyncThunk('goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
    } catch (error) {
      const message = (
        (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(createGoal.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createGoal.fulfilled, (state, action) =>{
      state.isLoading = false;
      state.isSuccess = true;
      state.goals.push(action.payload);
    })
    .addCase(createGoal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload; // possible because we used thunkAPI.rejectWithValue(message) in register function
    })
    .addCase(getGoals.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getGoals.fulfilled, (state, action) =>{
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = action.payload;
    })
    .addCase(getGoals.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload; // possible because we used thunkAPI.rejectWithValue(message) in register function
    })
  }
})

export const { reset } = goalSlice.actions; // actions actually is the "reducers"
export default goalSlice.reducer
