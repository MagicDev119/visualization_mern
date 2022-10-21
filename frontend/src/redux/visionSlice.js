import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VisionDataService from "../services/VisionService";

const initialState = [];

const visionSlice = createSlice({
    name: 'vision',
    initialState: {
        visionData: {}
    },
    reducers: {
        visionData: (state, action) => {
            state.visionData = action.payload.visionData;
        }
    }
});

export const { visionData } = visionSlice.actions;
export const visionInfo = (state) => state.vision.visionData;
const { reducer } = visionSlice;
export default reducer;