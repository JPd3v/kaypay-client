import { ModalWrapper } from 'features/modals';
import {
  NewTransferenceForm,
  useTransferencesModal,
} from 'features/transferences';

export default function TransferencesModal() {
  const { isOpen } = useTransferencesModal();
  return isOpen ? (
    <ModalWrapper>
      <NewTransferenceForm />
    </ModalWrapper>
  ) : null;
}
