import { TonConnectUIProvider } from '@tonconnect/ui-react'

type TonProviderProps = {
    children: React.ReactNode
}

const TonProvider = ({ children }: TonProviderProps) => {
    return (
        <TonConnectUIProvider manifestUrl='manifest.json'>
            {children}
        </TonConnectUIProvider>
    )
}
export default TonProvider    