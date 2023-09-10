import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

type Props = {
  onSubmit: () => void;
  onClose: () => void;
};

const CheckPasswordModal: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [password, setPassword] = useState<string>('');

  const onEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && password) {
      onSubmit();
    }
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg w-[330px] h-[220px]">
                <div className="w-full flex justify-end pt-3 pr-3">
                  <XMarkIcon className="w-5 cursor-pointer" onClick={onClose} />
                </div>
                <div className="mt-[-2px]">
                  <div className="bg-white px-6 pb-4 w-full">
                    <div className="mt-3 sm:ml-4 sm:mt-0 text-left">
                      <Dialog.Title className="text-xl font-semibold text-gray-900">비밀번호 확인</Dialog.Title>
                      <div className="mt-2">
                        <p className="text-md text-gray-500">비밀번호를 입력해주세요.</p>
                      </div>
                    </div>
                  </div>
                  <form className="w-full flex flex-col items-center mt-1 px-10" onSubmit={onSubmit}>
                    <input
                      className="h-10 w-full bg-red border-[1.5px] border-solid rounded text-sm p-2 outline-none"
                      type="password"
                      onKeyDown={onEnter}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <div className="w-full flex justify-end mt-5 mr-[-10px]">
                      <button type="submit" className="bg-blue-500 px-6 py-1.5 rounded-sm text-white text-sm">
                        확인
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CheckPasswordModal;
