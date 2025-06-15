import { createContext, useState } from 'react';
import type {ModalContextType, ModalType} from "../types/types";

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [currentModal, setCurrentModal] = useState<ModalType>(null);

    const openModal = (type: ModalType) => setCurrentModal(type);
    const closeModal = () => setCurrentModal(null);

    return (
        <ModalContext.Provider value={{ openModal, closeModal, currentModal }}>
            {children}
        </ModalContext.Provider>
    );
}

