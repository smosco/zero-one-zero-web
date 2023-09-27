import CheckPasswordModal from '@/components/CheckPasswordModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ShareModal from './ShareModal';

type VoteMenuProps = {
  roomCode: string | null;
  roomId: number | null;
  back?: boolean;
};

export default function VoteMenu({ roomCode, roomId, back }: VoteMenuProps) {
  const router = useRouter();
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

  const onGoBackClick = () => {
    router.push('/');
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        {back && (
          <button className="hover:underline text-sm" onClick={onGoBackClick}>
            투표 만들러 가기
          </button>
        )}
        <div className="flex items-center gap-2">
          <button className="hover:underline text-sm" onClick={onShareClick}>
            공유하기
          </button>
          <button className="hover:underline text-sm" onClick={onEndClick}>
            투표종료
          </button>
        </div>
      </div>

      {shareOpen && <ShareModal onClose={onShareClose} roomCode={roomCode!} />}
      {open && <CheckPasswordModal roomId={roomId!} onClose={onCheckPasswordClose} />}
    </>
  );
}
