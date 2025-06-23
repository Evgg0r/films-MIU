import {CLOSE_MODAL, MODAL_INITIAL_STATE, OPEN_MODAL} from "../../constants/constants.ts";
import type {CloseAction, ModalAction, ModalState, ModalType, OpenAction} from "../../types/types.ts";

export function modalReducer(state = MODAL_INITIAL_STATE, action: ModalAction): ModalState  {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                currentModal: action.payload,
            };
        case CLOSE_MODAL:
            return {
                currentModal: null,
            };
        default:
            return state;
    }
}

export const openModal = (currentModal:ModalType ): OpenAction  => ({
    type: OPEN_MODAL,
    payload: currentModal,
})

export const closeModal = (): CloseAction  => ({
    type: CLOSE_MODAL,
})