// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useHelp } from 'contexts/Help'
import { useActivePool } from 'contexts/Pools/ActivePool'
import { useValidators } from 'contexts/Validators/ValidatorEntries'
import { useOverlay } from 'kits/Overlay/Provider'
import { CardHeaderWrapper, CardWrapper } from 'library/Card/Wrappers'
import { Nominations } from 'library/Nominations'
import { useTranslation } from 'react-i18next'
import { ButtonHelp, ButtonPrimary } from 'ui-buttons'
import { PageRow } from 'ui-structure'

export const ManagePool = () => {
  const { t } = useTranslation()
  const { openCanvas } = useOverlay().canvas
  const { formatWithPrefs } = useValidators()
  const { isOwner, isNominator, activePoolNominations, activePool } =
    useActivePool()

  const poolNominated = activePoolNominations
    ? formatWithPrefs(activePoolNominations.targets)
    : []

  const isNominating = !!activePoolNominations?.targets?.length
  const nominator = activePool?.addresses?.stash ?? null
  const { state } = activePool?.bondedPool || {}
  const { openHelp } = useHelp()

  const canNominate = isOwner() || isNominator()

  return (
    <PageRow>
      <CardWrapper>
        {canNominate && !isNominating && state !== 'Destroying' ? (
          <>
            <CardHeaderWrapper $withAction $withMargin>
              <h3>
                {t('nominate.nominations', { ns: 'pages' })}
                <ButtonHelp
                  marginLeft
                  onClick={() => openHelp('Nominations')}
                />
              </h3>
              <div>
                <ButtonPrimary
                  iconLeft={faChevronCircleRight}
                  iconTransform="grow-1"
                  text={t('pools.nominate', { ns: 'pages' })}
                  disabled={!canNominate}
                  onClick={() =>
                    openCanvas({
                      key: 'ManageNominations',
                      scroll: false,
                      options: {
                        bondFor: 'pool',
                        nominator,
                        nominated: poolNominated || [],
                      },
                      size: 'xl',
                    })
                  }
                />
              </div>
            </CardHeaderWrapper>
            <h4>{t('notNominating', { ns: 'library' })}.</h4>
          </>
        ) : (
          <Nominations bondFor="pool" nominator={nominator} />
        )}
      </CardWrapper>
    </PageRow>
  )
}
