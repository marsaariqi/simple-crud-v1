"use client"
import { useEffect } from "react";

interface ModalProps {
    openModal: boolean
    setOpenModal: (open: boolean) => boolean | void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ openModal, setOpenModal, children }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenModal(false);
            }
        };

        if (openModal) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [openModal, setOpenModal]);

    return (
        <>
            <dialog id="my_modal_2" className={`modal ${openModal ? "modal-open" : ""} `}>
                <div className="modal-box rounded-xl">
                    <button onClick={() => setOpenModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    {children}
                </div>
                <form method="dialog" className="modal-backdrop" onClick={() => setOpenModal(false)}>
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default Modal