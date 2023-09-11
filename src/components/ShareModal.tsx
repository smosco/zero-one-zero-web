import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useRef, useState } from 'react';

type ShareData = {
  url?: string;
  text?: string;
  title?: string;
  files?: File[];
};

type ShareModalProps = {
  onClose: () => void;
  code: number;
};

export default function ShareModal({ onClose, code }: ShareModalProps) {
  const copyRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (code.toString().length > 20) {
      setInput(code.toString().slice(0, 19) + '...');
    }
    setInput(code.toString());
  }, [code]);

  const onShare = async () => {
    const data: ShareData = {
      title: `공일공 - 투표를 공유합니다\n\n코드번호 : ${input}`,
      url: '',
    };

    if (navigator.share) {
      navigator
        .share(data)
        .then(() => console.log('공유 성공'))
        .catch((error) => console.log('공유 실패', error));
    } else {
      alert('공유하기가 지원되지 않는 환경입니다.');
    }
  };

  const onCopyText = () => {
    if (copyRef.current) {
      copyRef.current.focus();
      copyRef.current.select();

      navigator.clipboard.writeText(copyRef.current.value).then(() => {
        alert('코드가 클립보드에 저장되었습니다.');
      });
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-100 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg w-[330px] h-[180px]">
                <div className="w-full flex justify-end pt-3 pr-3">
                  <XMarkIcon className="w-6 cursor-pointer" onClick={onClose} />
                </div>
                <div className="px-6 w-full mt-[-10px]">
                  <div className="mt-3 sm:ml-4 sm:mt-0 text-center">
                    <Dialog.Title className="text-xl font-semibold text-gray-900">공유하기</Dialog.Title>
                  </div>
                </div>
                <div className="p-6">
                  <div onClick={onCopyText}>
                    <input
                      className="w-full h-9 outline-none rounded-xl border-[1px] border-gray-300 bg-gray-100 p-2.5 flex justify-between text-xs text-blue-500 cursor-pointer"
                      ref={copyRef}
                      value={input}
                      readOnly
                    />
                  </div>
                  <button
                    className="absolute top-20 mt-[-1.8px] text-xs w-15 h-9 right-6 bg-gray-200 py-[9.3px] px-1 rounded-r-xl text-gray-500 border-[1px] border-gray-300 hover:bg-gray-300 hover:text-gray-600 outline-none"
                    onClick={onCopyText}
                  >
                    코드 복사
                  </button>
                </div>
                <div className="w-full flex justify-center">
                  <button className="text-xs" onClick={onShare}>
                    또는 바로 공유하기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
