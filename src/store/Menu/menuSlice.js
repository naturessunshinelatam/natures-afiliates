import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMobileOpen: false,
    openPath: [], // ej: ["products", "prod-web"]
    isScrolled: false,
    isHidden: false,
    activeSectionId: null
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMobileOpen(state, action) {
            state.isMobileOpen = action.payload;
        },
        toggleMobileOpen(state) {
            state.isMobileOpen = !state.isMobileOpen;
        },
        setOpenPath(state, action) {
            state.openPath = action.payload;
        },
        togglePathId(state, action) {
            const id = action.payload;
            const idx = state.openPath.indexOf(id);
            if (idx >= 0) state.openPath = state.openPath.slice(0, idx);
            else state.openPath.push(id);
        },
        setScrolled(state, action) {
            state.isScrolled = action.payload;
        },
        setHidden(state, action) {
            state.isHidden = action.payload;
        },
        setActiveSectionId(state, action) {
            state.activeSectionId = action.payload;
        },
        closeAll(state) {
            state.isMobileOpen = false;
            state.openPath = [];
        },
    },
});

export const {
    setMobileOpen,
    toggleMobileOpen,
    setOpenPath,
    togglePathId,
    setScrolled,
    setHidden,
    setActiveSectionId,
    closeAll,
} = menuSlice.actions;

export default menuSlice.reducer;