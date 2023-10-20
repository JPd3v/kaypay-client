import { close, open, selectModals } from 'features/modals/stores/modals.slice';
import { useAppDispatch, useAppSelector } from 'hooks';

export default function useTransferencesModal() {
  const { transferencesModal } = useAppSelector(selectModals);
  const dispatch = useAppDispatch();
  return {
    isOpen: transferencesModal,
    open: () => dispatch(open({ modal: 'transferencesModal' })),
    close: () => dispatch(close({ modal: 'transferencesModal' })),
  };
}
