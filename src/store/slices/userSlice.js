import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

/*
    Ducks Pattern
    - MUST `export default` reducer
    - MUST `export` its actions as functions
*/
const userSlice = createSlice({
    name: "user",
    initialState: [{ id: 1, name: "User 01", username: "user01" }],
    reducers: {
        fetchUser: (state, action) => {
            console.log("userSlice.fetchUser");
        },
        fetchSuccess: produce((draft, action) => {
            console.log("userSlice.fetchSuccess", action.payload);
            let lastId = draft.length === 0 ? 0 : draft[draft.length - 1].id;
            action.payload.map((v, i) => {
                draft.push({
                    id: lastId + i + 1,
                    name: v.name,
                    username: v.username
                });
            })
        }),
        fetchFailed: (state, action) => {
            console.log("userSlice.fetchFailed", action.message);
        },
        addUser: produce((draft, action) => {
            draft.push({
                id: action.payload.id,
                name: action.payload.name,
                username: action.payload.username
            });
        }),
        updateUser: produce((draft, action) => {
            draft.map(d => {
                if (d.id === action.payload.id) {
                    d.username = action.payload.username;
                }
            })
        }),
        deleteUser: produce((draft, action) => {
            const vIndex = draft.findIndex(d => d.id === action.payload.id);
            if (vIndex > -1) {
                draft.splice(vIndex, 1);
            }
        }),
    }
});

export const { addUser, updateUser, deleteUser, fetchUser, fetchSuccess, fetchFailed } = userSlice.actions;
export default userSlice.reducer;