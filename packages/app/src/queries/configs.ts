import { graphql } from '../gql'

export const getConfigsDocument = graphql(/* GraphQL */ `
  query GetConfigs($evmChainId: String!, $joyChainId: String!) {
    evmBridgeConfigs(where: { id_eq: $evmChainId }) {
      id
      status
      bridgeOperatorAccounts
      bridgeAdminAccounts
      timelockAdminAccounts
      pauserAccounts
      mintingLimits {
        periodLength
        periodLimit
        currentPeriodMinted
        currentPeriodEndBlock
      }
      bridgingFee
      totalBurned
      totalMinted
    }
    joyBridgeConfigs(where: { id_eq: $joyChainId }) {
      id
      status
      operatorAccount
      pauserAccounts
      mintAllowance
      feesBurned
      bridgingFee
      supportedRemoteChainIds
      thawnDurationBlocks
      thawnEndsAtBlock
      totalBurned
      totalMinted
    }
  }
`)
