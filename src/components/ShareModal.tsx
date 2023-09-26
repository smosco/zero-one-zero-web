import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Button from './Button';

type ShareData = {
  url?: string;
  text?: string;
  title?: string;
  files?: File[];
};

type ShareModalProps = {
  onClose: () => void;
  roomCode: string;
};

export default function ShareModal({ onClose, roomCode }: ShareModalProps) {
  const copyRef = useRef<HTMLInputElement>(null);
  const [shareUrl, setShareUrl] = useState<string>('');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  useEffect(() => {
    setShareUrl(`${siteUrl}?roomCode=${roomCode}`);
  }, [siteUrl, roomCode]);

  const onShare = async () => {
    const data: ShareData = {
      title: `공일공 - 투표를 공유합니다\n\n코드번호 : ${shareUrl}`,
      url: '',
    };

    if (navigator.share) {
      /** @todo 에러 핸들링 */
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
              <Dialog.Panel className="relative min-w-[350px] p-8 rounded-lg bg-white shadow-xl">
                <XMarkIcon className="absolute top-4 right-4 w-5 cursor-pointer" onClick={onClose} />

                <div className="flex flex-col gap-4">
                  <Dialog.Title className="text-xl font-semibold text-gray-900">공유하기</Dialog.Title>

                  <div className="relative w-full h-10" onClick={onCopyText}>
                    <input
                      className="w-full h-full outline-indigo-200 rounded-xl border border-indigo-200 bg-white p-2.5 text-sm text-gray-400 cursor-pointer"
                      ref={copyRef}
                      value={shareUrl}
                      readOnly
                    />
                    <button
                      className="absolute top-0 right-0 w-15 px-4 h-full rounded-r-xl text-white bg-indigo-500 borde"
                      onClick={onCopyText}
                    >
                      복사
                    </button>
                  </div>

                  <button type="submit" className="text-[14px] hover:underline" onClick={onShare}>
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
