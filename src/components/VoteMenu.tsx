import CheckPasswordModal from '@/components/CheckPasswordModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type VoteMenuProps = {
  share: boolean;
};

export default function VoteMenu({ share }: VoteMenuProps) {
  const router = useRouter();

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
          <button className={`${!share && 'hidden'}`}>공유하기</button>
        </div>
      </div>
      {open && <CheckPasswordModal onSubmit={onCheckPasswordSubmit} onClose={onCheckPasswordClose} />}
    </>
  );
}
