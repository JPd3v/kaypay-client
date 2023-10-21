import { AuthModal } from 'features/auth';
import { DepositsModal } from 'features/deposits';
import { TransferencesModal } from 'features/transferences';
import { WithdrawModal } from 'features/withdraws';

export default function ModalsManager() {
  return (
    <div>
      <AuthModal />
      <DepositsModal />
      <TransferencesModal />
      <WithdrawModal />
    </div>
  );
}
