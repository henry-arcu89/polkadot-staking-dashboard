// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { appendOrEmpty } from '@w3ux/utils'
import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'
import type { ModalPaddingProps } from '../types'

/**
 * @name ModalPadding
 * @summary Generic wrapper for modal padding.
 */
export const ModalPadding = forwardRef(
  (
    { children, style, verticalOnly, horizontalOnly }: ModalPaddingProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      className={`modal-padding${appendOrEmpty(
        verticalOnly,
        'vertical-only'
      )}${appendOrEmpty(horizontalOnly, 'horizontal-only')}`}
      style={style}
    >
      {children}
    </div>
  )
)
ModalPadding.displayName = 'ModalPadding'
