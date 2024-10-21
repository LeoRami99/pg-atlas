import { TonConnectUIProvider } from '@tonconnect/ui-react'

type TonProviderProps = {
    children: React.ReactNode
}

const TonProvider = ({ children }: TonProviderProps) => {
    return (
        <TonConnectUIProvider manifestUrl='https://rapid-limit-5419.on.fleek.co/manifest.json'>
            {children}
        </TonConnectUIProvider>
    )
}
export default TonProvider    