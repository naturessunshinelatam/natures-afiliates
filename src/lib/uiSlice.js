import { createSlice } from '@reduxjs/toolkit';

const ui = createSlice({
    name: 'ui',
    initialState: { loading: false },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = ui.actions;
export default ui.reducer;
