import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CategoryIdState {
    id: number | null;
}

const initialState: CategoryIdState = {
    id: null,
};

export const categoryIdSlice = createSlice({
    name: 'categoryId',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number | null>) => {
            state.id = action.payload;
        },
    },
});

export const { setCategoryId } = categoryIdSlice.actions;

export default categoryIdSlice.reducer;