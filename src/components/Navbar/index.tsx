import { TonConnectButton } from "@tonconnect/ui-react";
import Menu from "../Menu";

const Navbar = () => {
    return (
        <div className="md:w-3/4 w-full fixed z-10 flex items-center transition-[width] duration-300 md:space-x-10">
            <Menu />
            <div className="navbar top-0 md:mt-5 backdrop-blur bg-white/30 md:border-[1px] shadow-xl rounded-badge transition-[width] duration-300  m-2">
                <div className="flex-1">
                    <img src="/logoPgAtlas.png" alt="Logo PGAtlas" className="w-16" />
                    <a className="text-xl font-bold">PGAtlas</a>
                </div>
                <div className="flex-none">
                    <TonConnectButton />

                    <div className="dropdown dropdown-end">

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;