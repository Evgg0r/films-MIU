import {RequestTokenModal} from "../RequestTokenModal/RequestTokenModal";
import {EnterTokenModal} from "../EnterTokenModal/EnterTokenModal";
import type {ModalKey, ModalProps} from "../../types/types";
import type {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import {closeModal} from "../../redux/reducers/modalReducer.ts";

const modalComponents: Record<ModalKey, FC<ModalProps>> = {
    requestToken: RequestTokenModal,
    enterToken: EnterTokenModal,
};

export function ModalsContainer() {
    const currentModal = useSelector((state: RootState) => state.modal.currentModal);
    const dispatch = useDispatch();

    if (!currentModal) return null;

    const ModalComponent = modalComponents[currentModal];

    return <ModalComponent open={true} onClose={() => dispatch(closeModal())} />;
}