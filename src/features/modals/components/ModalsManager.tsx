import { AuthModal } from 'features/auth';
import { DepositsModal } from 'features/deposits';
import { TransferencesModal } from 'features/transferences';

export default function ModalsManager() {
  return (
    <div>
      <AuthModal />
      <DepositsModal />
      <TransferencesModal />
    </div>
  );
}
