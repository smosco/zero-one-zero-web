import CheckPasswordModal from '@/components/CheckPasswordModal';
import { RoomContext } from '@/context/RoomContext';
import { useContext, useState } from 'react';
import Button from './Button';
import ShareModal from './ShareModal';

type VoteMenuProps = {
  roomCode: string | null;
  roomId: number | null;
};

export default function VoteMenu({ roomCode, roomId }: VoteMenuProps) {
  // const { roomCode, roomId } = useContext(RoomContext);

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
      <div className="w-full flex justify-center items-center gap-4">
        <Button type="button" onClick={onShareClick}>
          공유하기
        </Button>
        <Button type="button" onClick={onEndClick}>
          투표 종료
        </Button>
      </div>

      {shareOpen && <ShareModal onClose={onShareClose} roomCode={roomCode!} />}
      {open && <CheckPasswordModal roomId={roomId!} onClose={onCheckPasswordClose} />}
    </>
  );
}
