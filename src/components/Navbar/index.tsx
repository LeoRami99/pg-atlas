import { useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Menu from "../Menu";
import { useViewApi } from "../../hooks/useModalApi";
import Button from "../Button";

const Navbar = () => {
    const { viewApi, setViewApi } = useViewApi();
    const [selectedWallet, setSelectedWallet] = useState("");

    const viewApiHandler = () => {
        setViewApi(!viewApi);
    };

    return (
        <>
            <div className="md:w-3/4 w-full fixed z-10 flex items-center transition-[width] duration-300 md:space-x-10">
                <Menu />
                <div className="navbar top-0 md:mt-5 backdrop-blur bg-black/20 shadow-xl rounded-badge transition-[width] duration-300 m-2">
                    <div className="flex-1">
                        <img src="/logoPgAtlas.png" alt="Logo PGAtlas" className="w-16" />
                        <a className="text-xl font-bold text-white">PGAtlas</a>
                    </div>
                    <div className="flex-none flex flex-col md:flex-row">
                        <Button className="btn btn-secondary rounded-badge btn-sm" onClick={viewApiHandler}>
                            API PGAtlas
                        </Button>
                        {selectedWallet ? (
                            selectedWallet === "ton" ? <TonConnectButton /> : <ConnectButton chainStatus="icon" showBalance />
                        ) : (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn m-1 btn-primary rounded-badge text-white btn-sm w-full">Connect Wallet</div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li onClick={() => setSelectedWallet("rainbow")}>
                                        <a>RainbowKit Wallet</a>
                                    </li>
                                    <li onClick={() => setSelectedWallet("ton")}>
                                        <a>TON Wallet</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
