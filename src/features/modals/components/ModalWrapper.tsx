import ReactFocusLock from 'react-focus-lock';

interface Props {
  children: JSX.Element;
}

export default function ModalWrapper({ children }: Props) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen overflow-auto bg-gray-900/20">
      <ReactFocusLock className="m-auto flex w-full justify-center">
        {children}
      </ReactFocusLock>
    </div>
  );
}
