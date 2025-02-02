// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { FastUnstakeContextInterface, MetaInterface } from './types'

export const defaultMeta: MetaInterface = {
  checked: [],
}

export const defaultFastUnstakeContext: FastUnstakeContextInterface = {
  getLocalkey: (address) => '',
  checking: false,
  meta: defaultMeta,
  isExposed: null,
  head: undefined,
  queueDeposit: undefined,
  counterForQueue: undefined,
}
