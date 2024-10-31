import { ComponentProps } from "react";
// import Button from "../Button";
// import { IoIosCloseCircle } from "react-icons/io";
type ModalProps = ComponentProps<'dialog'> & {
    children: React.ReactNode;
};

const Modal = ({ ...props }: ModalProps) => {
    return (
        <dialog className={`modal backdrop-blur`} {...props}>
            <div className={`modal-box`}>
                {props.children}
            </div>
        </dialog>
    );
};

export default Modal;