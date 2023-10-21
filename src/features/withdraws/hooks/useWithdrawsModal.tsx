import { close, open, selectModals } from 'features/modals/stores/modals.slice';
import { useAppDispatch, useAppSelector } from 'hooks';

export default function useWithdrawsModal() {
  const { withdrawsModal } = useAppSelector(selectModals);
  const dispatch = useAppDispatch();

  return {
    isOpen: withdrawsModal,
    open: () => dispatch(open({ modal: 'withdrawsModal' })),
    close: () => dispatch(close({ modal: 'withdrawsModal' })),
  };
}
