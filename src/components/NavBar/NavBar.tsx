import HamburgerMenu from 'components/NavBar/HamburgerMenu';
import { useAuth, useLogInForm, useLogOut, useSignUpForm } from 'features/auth';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function NavBar() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const logInform = useLogInForm();
  const signUpform = useSignUpForm();
  const logOut = useLogOut();
  const user = useAuth();

  function handleTogleHamburgerMenu() {
    setShowHamburgerMenu((prev) => !prev);
  }

  return (
    <nav className="sticky top-0 flex items-center justify-between bg-white p-2 px-6 shadow-md ">
      <h1 className=" text-2xl font-bold text-blue-600">
        <a href="/">kaypay</a>
      </h1>

      <HamburgerMenu
        isOpen={showHamburgerMenu}
        handleTogleMenu={() => handleTogleHamburgerMenu()}
      />
      <button
        type="button"
        aria-label="open menu"
        onClick={handleTogleHamburgerMenu}
        className="sm:hidden"
      >
        <GiHamburgerMenu className="h-5 w-5" />
      </button>
      <div className=" hidden gap-2 sm:flex">
        {user?.data?.id ? (
          <button type="button" onClick={() => logOut.mutate()}>
            log out
          </button>
        ) : (
          <>
            <button
              type="button"
              className="rounded-full bg-blue-600 p-1 px-2 font-medium text-white hover:bg-blue-600"
              onClick={logInform.open}
            >
              log in
            </button>
            <button
              type="button"
              className="rounded-full bg-blue-600 p-1 px-2 font-medium text-white hover:bg-blue-600"
              onClick={signUpform.open}
            >
              sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
