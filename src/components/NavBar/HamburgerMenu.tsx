import { Transition } from '@headlessui/react';
import ReactFocusLock from 'react-focus-lock';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  isOpen: boolean;
  handleTogleMenu: () => void;
}

export default function HamburgerMenu({ isOpen, handleTogleMenu }: Props) {
  return (
    <ReactFocusLock>
      <Transition
        className="fixed right-0 top-0 "
        appear
        show={isOpen}
        enter=" transition-transform duration-[1000ms] "
        enterFrom="translate-x-full"
        enterTo=" translate-x-0"
        leave=" transition-transform duration-[1000ms] "
        leaveFrom="translate-x-0"
        leaveTo=" translate-x-full"
      >
        <div className="flex h-screen w-48 flex-col gap-3 bg-blue-600 py-4 text-white">
          <button
            type="button"
            aria-label="close menu"
            className="self-center "
            onClick={handleTogleMenu}
          >
            <AiOutlineClose className="h-7 w-7 " />
          </button>
          <button type="button">sign up</button>
          <button type="button">log in</button>
        </div>
      </Transition>
    </ReactFocusLock>
  );
}
