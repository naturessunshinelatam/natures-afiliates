import { configureStore } from '@reduxjs/toolkit';
import ui from '../lib/uiSlice';
import geo from './geoSlice';
import content from './contentSlice';
export const store = configureStore({
    reducer: {
        ui,
        geo,
        content
    },
});

