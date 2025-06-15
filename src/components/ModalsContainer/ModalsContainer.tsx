import {useModal} from "../../hooks/hooks";
import {RequestTokenModal} from "../RequestTokenModal/RequestTokenModal";
import {EnterTokenModal} from "../EnterTokenModal/EnterTokenModal.tsx";


export function ModalsContainer() {
    const { currentModal, closeModal } = useModal();

    return (
        <>
            {currentModal === 'requestToken' && (
                <RequestTokenModal open={true} onClose={closeModal} />
            )}
            {currentModal === 'enterToken' && (
        <EnterTokenModal open={true} onClose={closeModal} />
      )}
        </>
    );
}