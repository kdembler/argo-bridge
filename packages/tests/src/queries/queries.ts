import { graphql } from "../gql"

export const getTimelockCallsQueryDocument = graphql(/* GraphQL */ `
  query GetTimelockCalls($where: EvmTimelockCallWhereInput) {
    evmTimelockCalls(where: $where, orderBy: createdAtBlock_DESC) {
      id
      callId
      chainId
      callArgs
      callData
      callSignature
      callTarget
      callValue
      cancelledAtBlock
      cancelledAtTimestamp
      cancelledTxHash
      createdAtBlock
      createdAtTimestamp
      createdTxHash
      delayDoneTimestamp
      executedAtBlock
      executedAtTimestamp
      executedTxHash
      predecessor
      salt
      status
    }
  }
`)

export const getEvmBridgeConfig = graphql(/* GraphQL */ `
  query GetEvmBridgeConfig($chainId: String!) {
    evmBridgeConfigs(where: { id_eq: $chainId }) {
      id
      status
      bridgingFee
      mintingLimits {
        periodLength
        periodLimit
        currentPeriodMinted
        currentPeriodEndBlock
      }
      totalMinted
      totalBurned
    }
  }
`)

export const getBridgeTransfersDocument = graphql(/* GraphQL */ `
  query GetBridgeTransfers($where: BridgeTransferWhereInput) {
    bridgeTransfers(orderBy: createdAtBlock_DESC, where: $where) {
      id
      amount
      status
      feePaid
      sourceChainId
      sourceTransferId
      sourceAccount
      destChainId
      destAccount
      createdAtBlock
      createdAtTimestamp
      createdTxHash
      completedTxHash
      completedAtTimestamp
      completedAtBlock
    }
  }
`)
