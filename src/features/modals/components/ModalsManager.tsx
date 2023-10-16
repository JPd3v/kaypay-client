import { AuthModal } from 'features/auth';
import { DepositsModal } from 'features/deposits';

export default function ModalsManager() {
  return (
    <div>
      <AuthModal />
      <DepositsModal />
    </div>
  );
}
