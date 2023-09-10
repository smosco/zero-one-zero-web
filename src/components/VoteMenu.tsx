type VoteMenuProps = {
  share: boolean;
};

export default function VoteMenu({ share }: VoteMenuProps) {
  return (
    <div className="w-full flex">
      <div className={`flex items-center ${share ? 'justify-between' : 'justify-end'}`} style={{ width: '23rem' }}>
        <div>
          <button>투표 수정 </button>
          <button className="ml-2">투표 종료</button>
        </div>
        <button className={`${!share && 'hidden'}`}>공유하기</button>
      </div>
    </div>
  );
}
