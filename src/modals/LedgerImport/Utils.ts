// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { LedgerResponse } from 'contexts/Hardware/types';
import type { AnyJson } from 'types';

// formats a title and subtitle depending on the Ledger code received.
export const getDisplayFromLedgerCode = (
  statusCode: string,
  inStatusBar = false
) => {
  let title;
  let subtitle = null;

  switch (statusCode) {
    case 'DeviceNotConnected':
      title = inStatusBar
        ? 'Waiting For Ledger Device'
        : 'Ledger Not Connected';
      subtitle = inStatusBar
        ? ''
        : 'Connect a Ledger device to continue account import.';
      break;
    case 'AppNotOpen':
      title = 'Open the Polkadot App';
      subtitle =
        'Tip: If the app is open after unlocking the device, quit and re-open the app.';
      break;
    case 'GettingAddress':
      title = 'Getting Address...';
      break;
    case 'ReceivedAddress':
      title = 'Successfully Fetched Address';
      break;
    default:
      title = 'Connecting to Device...';
  }
  return { title, subtitle };
};

// Determine the status of connection process. If the device is reported to be connected, ignore
// `DeviceNotConnected` error returned by other tasks.
export const determineStatusFromCodes = (
  responses: Array<LedgerResponse>,
  inStatusBar: boolean
) => {
  if (!responses.length) {
    return getDisplayFromLedgerCode('', inStatusBar);
  }

  const latestStatusCode: string = responses[0].statusCode;
  let trueCode = latestStatusCode;

  if (latestStatusCode === 'DeviceNotConnected') {
    responses.every((b: AnyJson) => {
      if (b.statusCode !== 'DeviceNotConnected') {
        trueCode = b.statusCode;
        return false;
      }
      return true;
    });
  }
  return getDisplayFromLedgerCode(trueCode || '', inStatusBar);
};
