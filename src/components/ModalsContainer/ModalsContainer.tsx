import {useModal} from "../../hooks/hooks";
import {RequestTokenModal} from "../RequestTokenModal/RequestTokenModal";
import {EnterTokenModal} from "../EnterTokenModal/EnterTokenModal";
import type {ModalKey, ModalProps} from "../../types/types.ts";
import type {FC} from "react";

const modalComponents: Record<ModalKey, FC<ModalProps>> = {
    requestToken: RequestTokenModal,
    enterToken: EnterTokenModal,
};

export function ModalsContainer() {
    const { currentModal, closeModal } = useModal();

    if (!currentModal) return null;

    const ModalComponent = modalComponents[currentModal];

    return <ModalComponent open={true} onClose={closeModal} />;
}