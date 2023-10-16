import { NewDepositForm, useDepositsModal } from 'features/deposits';
import { ModalWrapper } from 'features/modals';

export default function DepositsModal() {
  const { isOpen } = useDepositsModal();
  return isOpen ? (
    <ModalWrapper>
      <NewDepositForm />
    </ModalWrapper>
  ) : null;
}
