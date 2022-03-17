import { createSlice } from '@reduxjs/toolkit'
import produce from 'immer';


const themeSlice = createSlice({
    name: "theme",
    initialState: { dark: false },
    reducers: {
        toggle: produce((draft, action) => {
            draft.dark = !draft.dark;
        })
    }
});

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;