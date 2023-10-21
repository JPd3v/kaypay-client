import { ModalWrapper } from 'features/modals';
import { NewWithdrawForm, useWithdrawsModal } from 'features/withdraws';
import { AiOutlineClose } from 'react-icons/ai';

export default function WithdrawModal() {
  const { isOpen, close } = useWithdrawsModal();
  return isOpen ? (
    <ModalWrapper>
      <div className="relative m-1 w-full max-w-sm overflow-auto rounded bg-white p-2 sm:w-96">
        <button
          type="button"
          aria-label="close withdraw form"
          className="absolute right-0 top-0 m-1 "
          onClick={close}
        >
          <AiOutlineClose />
        </button>
        <NewWithdrawForm />
      </div>
    </ModalWrapper>
  ) : null;
}
