import { close, open, selectModals } from 'features/modals/stores/modals.slice';
import { useAppDispatch, useAppSelector } from 'hooks';

export default function useSignUpForm() {
  const dispatch = useAppDispatch();
  const { signUpModal } = useAppSelector(selectModals);

  return {
    isOpen: signUpModal,
    open: () => {
      dispatch(open({ modal: 'signUpModal' }));
    },
    close: () => {
      dispatch(close({ modal: 'signUpModal' }));
    },
  };
}
