import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdminAuth: false,
    adminData: {},
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        saveAdmin: (state, action) => {
            state.isAdminAuth = true;
            state.adminData = action.payload;
        },
        clearAdmin: (state) => {
            state.isAdminAuth = false;
            state.adminData = {};
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;