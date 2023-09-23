import CheckPasswordModal from '@/components/CheckPasswordModal';
import { RoomContext } from '@/context/RoomContext';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import ShareModal from './ShareModal';

export type VoteMenuProps = {
  share: boolean;
};

export default function VoteMenu({ share }: VoteMenuProps) {
  const router = useRouter();
  const { roomCode, roomId } = useContext(RoomContext);

  const [shareOpen, setShareOpen] = useState<boolean>(false);

  const [mode, setMode] = useState<'' | 'edit' | 'end'>('');
  const open = !!mode;

  const onEditClick = () => {
    setMode('edit');
  };

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
      <div className="w-full flex">
        <div
          className={clsx('flex items-center', share ? 'justify-between' : 'justify-end')}
          style={{ width: '23rem' }}
        >
          <div>
            <button onClick={onEditClick}>투표 수정</button>
            <button onClick={onEndClick} className="ml-2">
              투표 종료
            </button>
          </div>
          <button className={clsx({ hidden: !share })} onClick={onShareClick}>
            공유하기
          </button>
        </div>
      </div>
      {shareOpen && <ShareModal onClose={onShareClose} roomCode={roomCode!} />}
      {open && <CheckPasswordModal roomId={roomId!} onClose={onCheckPasswordClose} />}
    </>
  );
}
