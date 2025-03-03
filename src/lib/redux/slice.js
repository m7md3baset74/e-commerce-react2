import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inLoding : false,
    count: 0,
    m7md: "ay 7aga"
}

const counterSlice = createSlice ({
    name :"counter",
    initialState,
    reducers : {
        increase: ( state, action) => {
            state.count = state.count + action.paylode
        }
    }
})
export const counterReducer