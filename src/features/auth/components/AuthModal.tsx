import { ModalWrapper } from 'features/modals';
import LogInForm from 'features/auth/components/LogInForm';
import SignUpForm from 'features/auth/components/SignUpForm';

import { useLogInForm, useSignUpForm } from 'features/auth';

export default function AuthModal() {
  const logInModal = useLogInForm();
  const signUpModal = useSignUpForm();

  return logInModal.isOpen || signUpModal.isOpen ? (
    <ModalWrapper>
      <>
        {logInModal.isOpen ? <LogInForm /> : null}
        {signUpModal.isOpen ? <SignUpForm /> : null}
      </>
    </ModalWrapper>
  ) : null;
}
