import { close, open, selectModals } from 'features/modals/stores/modals.slice';
import { useAppDispatch } from 'hooks';
import { useSelector } from 'react-redux';

export default function useDepositsModal() {
  const dispatch = useAppDispatch();
  const { depositsModal } = useSelector(selectModals);

  return {
    isOpen: depositsModal,
    open: () => dispatch(open({ modal: 'depositsModal' })),
    close: () => dispatch(close({ modal: 'depositsModal' })),
  };
}
