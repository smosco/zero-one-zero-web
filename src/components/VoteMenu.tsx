import CheckPasswordModal from '@/components/CheckPasswordModal';
import { useState } from 'react';
import ShareModal from './ShareModal';

type VoteMenuProps = {
  roomCode: string | null;
  roomId: number | null;
};

export default function VoteMenu({ roomCode, roomId }: VoteMenuProps) {
  const [shareOpen, setShareOpen] = useState<boolean>(false);

  const [mode, setMode] = useState<'' | 'end'>('');
  const open = !!mode;

  const onEndClick = () => {
    setMode('end');
  };

  const onCheckPasswordClose = () => {
    setMode('');
  };

  const onShareClose = () => {
    setShareOpen(false);
  };

  const onShareClick = async () => {
    setShareOpen(true);
  };

  return (
    <>
      <div className="w-full flex justify-end items-center gap-2">
        <button className="hover:underline text-sm" onClick={onShareClick}>
          공유하기
        </button>
        <button className="hover:underline text-sm" onClick={onEndClick}>
          투표종료
        </button>
      </div>

      {shareOpen && <ShareModal onClose={onShareClose} roomCode={roomCode!} />}
      {open && <CheckPasswordModal roomId={roomId!} onClose={onCheckPasswordClose} />}
    </>
  );
}
