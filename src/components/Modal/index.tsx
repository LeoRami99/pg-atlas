import { ComponentProps } from "react";
import Button from "../Button";
import { IoIosCloseCircle } from "react-icons/io";
type ModalProps = ComponentProps<'dialog'> & {
    children: React.ReactNode;
};

const Modal = ({ ...props }: ModalProps) => {
    return (
        <dialog className="modal" {...props}>
            <div className="modal-box">
                {props.children}
                <div className="modal-action">
                    <form method="dialog">
                        <Button className="btn rounded-badge bg-red-500 text-white"><IoIosCloseCircle />Close</Button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;