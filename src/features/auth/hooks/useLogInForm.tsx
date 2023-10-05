import { close, open, selectModals } from 'features/modals/stores/modals.slice';
import { useAppDispatch, useAppSelector } from 'hooks';

export default function useLogInForm() {
  const dispatch = useAppDispatch();
  const { logInModal } = useAppSelector(selectModals);

  return {
    isOpen: logInModal,
    open: () => {
      dispatch(open({ modal: 'logInModal' }));
    },

    close: () => {
      dispatch(close({ modal: 'logInModal' }));
    },
  };
}
