import { WC_METADATA, WC_PROJECT_ID } from '@/config'
import { SafeManager } from '@/providers/safe/safe.manager'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { WagmiProvider } from 'wagmi'
import { base } from 'wagmi/chains'

const queryClient = new QueryClient()

const chains = [base] as const

const config = getDefaultConfig({
  appName: WC_METADATA.name,
  projectId: WC_PROJECT_ID,
  chains: chains,
})

export const EvmProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <SafeManager />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
