import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  process: "",
  endDate: "",
  department: "",
  person: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setProcess(state, action) {
      state.process = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setDepartment(state, action) {
      state.department = action.payload;
    },
    setPerson(state, action) {
      state.person = action.payload;
    },
  },
});

export const {
  setStartDate,
  setProcess,
  setEndDate,
  setDepartment,
  setPerson,
} = filterSlice.actions;

export const selectStartDate = (state) => state.filters.startDate;
export const selectProcess = (state) => state.filters.process;
export const selectEndDate = (state) => state.filters.endDate;
export const selectDepartment = (state) => state.filters.department;
export const selectPerson = (state) => state.filters.person;

export default filterSlice.reducer;
