import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const visionSlice = createSlice({
    name: 'vision',
    initialState: {
        visionData: {},
        isRemix: false
    },
    reducers: {
        visionData: (state, action) => {
            state.visionData = action.payload.visionData
        },
        changeStatus: (state, action) => {
            state.visionData.processing = action.payload.visionStatus
        },
        changeRemixStatus: (state, action) => {
            state.isRemix = action.payload.isRemix
        }
    }
});

export const { visionData, changeStatus, changeRemixStatus } = visionSlice.actions;
export const visionInfo = (state) => state.vision.visionData;
export const isRemix = (state) => state.vision.isRemix;
const { reducer } = visionSlice;
export default reducer;