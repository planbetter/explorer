import { MempoolTransaction, Transaction } from '@stacks/stacks-blockchain-api-types';
import { TransactionStatus } from '@common/constants';
import { TxStatus } from '@common/types/tx';

export function getTransactionStatus(tx: Transaction | MempoolTransaction) {
  if (tx?.tx_status === 'pending') {
    return TransactionStatus.PENDING;
  } else if (tx?.tx_status === 'success' && tx.is_unanchored) {
    return TransactionStatus.SUCCESS_MICROBLOCK;
  } else if (tx?.tx_status === 'success' && !tx.is_unanchored) {
    if (!tx.microblock_canonical) {
      return TransactionStatus.FAILED;
    } else {
      return TransactionStatus.SUCCESS_ANCHOR_BLOCK;
    }
  } else if (tx?.tx_status === 'abort_by_response' || tx?.tx_status === 'abort_by_post_condition') {
    return TransactionStatus.FAILED;
  }
}
