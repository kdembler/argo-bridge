import { FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProposeCall } from './proposals.utils'

import { Address, encodeFunctionData, isAddress } from 'viem'
import { BridgeAbi } from '@joystream/argo-core'
import { BRIDGE_ADDRESS } from '@/config'
import { useReadContract } from 'wagmi'
import { toast } from 'sonner'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { AddressLink } from '@/components/AddressLink'
import { NewProposalFields } from './NewProposalFields'
import { evmAddressSchema } from '@/lib/forms'

const formSchema = z.object({
  revokedPauserAddress: evmAddressSchema,
})
type FormSchema = z.infer<typeof formSchema>

export const RevokeEvmPauser: FC = () => {
  const { data } = useBridgeConfigs()
  const evmConfig = data?.evm

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const { data: pauserRole } = useReadContract({
    abi: BridgeAbi,
    address: BRIDGE_ADDRESS,
    functionName: 'PAUSER_ROLE',
  })

  const proposeCall = useProposeCall()

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!pauserRole || !evmConfig) {
      toast.error('Unexpected error')
      console.error({ pauserRole, evmConfig })
      return
    }
    const grantCalldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'revokeRole',
      args: [pauserRole, values.revokedPauserAddress],
    })

    await proposeCall([
      {
        target: BRIDGE_ADDRESS,
        calldata: grantCalldata,
      },
    ])
  }

  if (!evmConfig) {
    return <div>Loading...</div>
  }

  return (
    <NewProposalFields
      form={form}
      description="Remove pausing privileges from an address."
      fields={[
        {
          name: 'revokedPauserAddress',
          label: 'Revoked pauser address',
        },
      ]}
      onSubmit={handleSubmit}
    />
  )
}
