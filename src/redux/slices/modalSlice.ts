import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { MODAL_INITIAL_STATE } from '@/constants/constants';
import type { ModalType } from '@/types/types';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: MODAL_INITIAL_STATE,
    reducers: {
        openModal(state, action: PayloadAction<ModalType>) {
            state.currentModal = action.payload;
        },
        closeModal(state) {
            state.currentModal = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
