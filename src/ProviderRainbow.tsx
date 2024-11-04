import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    celo,
    celoAlfajores,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
    appName: 'PGAtlas',
    projectId: import.meta.env.VITE_WALLET_CONNECT,
    chains: [celo, celoAlfajores],
    ssr: true,
});

const queryClient = new QueryClient();

type ProviderRainbowKitProps = {
    children: React.ReactNode;
};

const ProviderRainbowKit = (props: ProviderRainbowKitProps) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default ProviderRainbowKit;