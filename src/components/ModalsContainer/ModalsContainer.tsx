import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EnterTokenModal } from '@/components/EnterTokenModal';
import { RequestTokenModal } from '@/components/RequestTokenModal';
import { closeModal } from '@/redux/slices/modalSlice';
import type { RootState } from '@/redux/store';
import type { ModalKey, ModalProps } from '@/types/types';

const modalComponents: Record<ModalKey, FC<ModalProps>> = {
    requestToken: RequestTokenModal,
    enterToken: EnterTokenModal,
};

export function ModalsContainer() {
    const currentModal = useSelector((state: RootState) => state.modal.currentModal);
    const dispatch = useDispatch();

    if (!currentModal) return null;

    const ModalComponent = modalComponents[currentModal as ModalKey];

    return <ModalComponent open={true} onClose={() => dispatch(closeModal())} />;
}
