import Button from "../Button";
import { CiMenuKebab } from "react-icons/ci";
import { SiGoogleforms } from "react-icons/si";
import { GoProjectSymlink } from "react-icons/go";
import { useState } from "react";
import "./index.css";

const Menu = () => {
    const [show, setShow] = useState(false);
    const [hoverElements, setHoverElements] = useState({ buttonForm: false, buttonProjects: false });

    const showMenu = () => {
        setShow(!show);
    };

    const handleHover = (id: string, isHovered: boolean) => {
        setHoverElements(prev => ({
            ...prev,
            [id]: isHovered
        }));
    };

    const openModalRegister = () => {
        const modal = document.getElementById("modal-register-project") as HTMLDialogElement;
        modal?.showModal();
    };

    return (
        <div className="space-y-4 md:relative md:mt-5 fixed mt-[220px] m-5 md:m-auto transition-all duration-300">
            <Button className="btn backdrop-blur bg-green-700/50 btn-lg border-[2px] border-green-700 btn-circle text-white shadow-xl hover:hover:bg-green-700/70" onClick={showMenu} aria-label="Menu">
                <CiMenuKebab className="w-6 h-6" />
            </Button>
            {show && (
                <div className={`fixed transition-transform duration-300 ease-out transform ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} z-10 animate-slide-in`}>
                    <ul className="space-y-4">
                        <li className="">
                            <Button
                                className="btn backdrop-blur bg-green-700/50 md:btn-lg border-[2px] hover:bg-green-700/70 hover:backdrop-blur border-green-700  btn-lg btn-circle text-white shadow-xl hover:btn-wide transition-all duration-300"
                                onMouseEnter={() => handleHover("buttonForm", true)}
                                onMouseLeave={() => handleHover("buttonForm", false)}
                                onClick={openModalRegister}
                            >
                                <span className="flex items-center">
                                    <SiGoogleforms className="w-6 h-6" />
                                    <span className={`text-white ${hoverElements.buttonForm ? 'block' : 'hidden'} ml-2`}>Register</span>
                                </span>
                            </Button>
                        </li>
                        <li>
                            <Button
                                className="btn backdrop-blur bg-green-700/70 md:btn-lg border-[2px] border-green-700  hover:backdrop-blur hover:bg-green-700/70  btn-lg btn-circle text-white shadow-xl hover:btn-wide transition-all duration-300"
                                onMouseEnter={() => handleHover("buttonProjects", true)}
                                onMouseLeave={() => handleHover("buttonProjects", false)}
                            >
                                <span className="flex items-center">
                                    <GoProjectSymlink className="w-6 h-6" />
                                    <span className={`text-white ${hoverElements.buttonProjects ? 'block' : 'hidden'} ml-2`}>Projects</span>
                                </span>

                            </Button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Menu;
