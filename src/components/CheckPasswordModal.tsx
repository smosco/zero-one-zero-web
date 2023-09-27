import { finishVote } from '@/api';
import { RoomContext } from '@/context/RoomContext';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { Fragment, useState, useContext } from 'react';
import Button from './Button';

export type CheckPasswordModal = {
  roomId: number;
  onClose: () => void;
};

export default function CheckPasswordModal({ roomId, onClose }: CheckPasswordModal) {
  const router = useRouter();
  const { setNonVoteUserName } = useContext(RoomContext);
  const [modifyCode, setModifyCode] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onCheckPasswordSubmit = async () => {
    try {
      const { name } = await finishVote(roomId, modifyCode);
      setNonVoteUserName!(name);
      if (window.location.href.includes('/result')) {
        window.location.reload();
      } else {
        router.push('/result');
      }
    } catch {
      setIsError(true);
      setErrorMessage('비밀번호가 잘못되었어요!');
    }
  };

  const onPasswordKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && modifyCode) {
      onCheckPasswordSubmit();
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCheckPasswordSubmit();
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
              <Dialog.Panel className="relative w-[330px] p-10 rounded-lg bg-white shadow-xl">
                <XMarkIcon className="absolute top-4 right-4 w-5 cursor-pointer" onClick={onClose} />

                <div className="w-full flex flex-col gap-4">
                  <Dialog.Title className="text-xl font-semibold text-gray-900">비밀번호 확인</Dialog.Title>
                  <form className="flex flex-col" onSubmit={onFormSubmit}>
                    <input
                      className="h-12 border-[1.5px] rounded-md p-3 outline-indigo-200 mb-2"
                      placeholder="비밀번호를 입력해주세요"
                      type="password"
                      onKeyDown={onPasswordKeyDown}
                      value={modifyCode}
                      onChange={(event) => setModifyCode(event.target.value)}
                    />
                    {isError && (
                      <p className="w-full ml-2 text-red-500 font-medium text-[13px] text-left">{errorMessage}</p>
                    )}

                    <Button type="submit" className="mt-2">
                      확인
                    </Button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
