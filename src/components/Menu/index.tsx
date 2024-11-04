import Button from "../Button";
import { GoProjectSymlink } from "react-icons/go";
import { useState } from "react";
import { useViewProjects } from "../../hooks/useViewProjects";
import "./index.css";

const Menu = () => {
    const { setViewProjects } = useViewProjects();

    const [hoverElements, setHoverElements] = useState({ buttonForm: false, buttonProjects: false });
    const handleHover = (id: string, isHovered: boolean) => {
        setHoverElements(prev => ({
            ...prev,
            [id]: isHovered
        }));
    };
    const viewAllProjects = () => {
        setViewProjects(true);
    };

    return (
        <div className="space-y-4 md:relative md:mt-5 fixed mt-[220px] m-5 md:m-auto transition-all duration-300">
            <Button
                className="btn backdrop-blur bg-green-700/70 md:btn-lg border-[2px] border-green-700  hover:backdrop-blur hover:bg-green-700/70  btn-lg btn-circle text-white shadow-xl hover:btn-wide transition-all duration-300"
                onMouseEnter={() => handleHover("buttonProjects", true)}
                onMouseLeave={() => handleHover("buttonProjects", false)}
                onClick={viewAllProjects}
            >
                <span className="flex items-center">
                    <GoProjectSymlink className="w-6 h-6" />
                    <span className={`text-white ${hoverElements.buttonProjects ? 'block' : 'hidden'} ml-2`}>Projects</span>
                </span>

            </Button>

        </div>
    );
};

export default Menu;
