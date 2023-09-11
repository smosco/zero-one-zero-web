import { getVoteListApi } from '@/apis/api';
import CheckPasswordModal from '@/components/CheckPasswordModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ShareModal from './ShareModal';

export type VoteMenuProps = {
  share: boolean;
};

export default function VoteMenu({ share }: VoteMenuProps) {
  const router = useRouter();

  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [code, setCode] = useState<number>(0);

  const [mode, setMode] = useState<'' | 'edit' | 'end'>('');
  const open = !!mode;

  const onEditClick = () => {
    setMode('edit');
  };

  const onEndClick = () => {
    setMode('end');
  };

  const onCheckPasswordSubmit = () => {
    if (mode === 'edit') router.push('/make');
    if (mode === 'end') router.push('/penalty');
  };

  const onCheckPasswordClose = () => {
    setMode('');
  };

  const onShareClose = () => {
    setShareOpen(false);
  };

  return (
    <>
      <div className="w-full flex">
        <div className={`flex items-center ${share ? 'justify-between' : 'justify-end'}`} style={{ width: '23rem' }}>
          <div>
            <button onClick={onEditClick}>투표 수정</button>
            <button onClick={onEndClick} className="ml-2">
              투표 종료
            </button>
          </div>
          <button
            className={`${!share && 'hidden'}`}
            onClick={async () => {
              const { voteId } = await getVoteListApi();
              setCode(voteId);
              setShareOpen(true);
            }}
          >
            공유하기
          </button>
        </div>
      </div>
      {shareOpen && <ShareModal onClose={onShareClose} code={code} />}
      {open && <CheckPasswordModal onSubmit={onCheckPasswordSubmit} onClose={onCheckPasswordClose} />}
    </>
  );
}
