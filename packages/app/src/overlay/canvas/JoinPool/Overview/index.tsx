// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { JoinForm } from './JoinForm'

import { useActiveAccounts } from 'contexts/ActiveAccounts'
import { useBalances } from 'contexts/Balances'
import { GraphLayoutWrapper } from '../Wrappers'
import type { OverviewSectionProps } from '../types'
import { Addresses } from './Addresses'
import { PerformanceGraph } from './PerformanceGraph'
import { Roles } from './Roles'
import { Stats } from './Stats'

export const Overview = (props: OverviewSectionProps) => {
  const { getPoolMembership } = useBalances()
  const { activeAccount } = useActiveAccounts()

  const {
    bondedPool: { state },
  } = props

  const showJoinForm =
    activeAccount !== null &&
    state === 'Open' &&
    getPoolMembership(activeAccount) === null

  return (
    <>
      <div className="main">
        <GraphLayoutWrapper>
          <Stats {...props} />
          <PerformanceGraph {...props} />
        </GraphLayoutWrapper>
        <Addresses {...props} />
        <Roles {...props} />
      </div>
      {showJoinForm && (
        <div className="side">
          <div>
            <JoinForm {...props} />
          </div>
        </div>
      )}
    </>
  )
}
