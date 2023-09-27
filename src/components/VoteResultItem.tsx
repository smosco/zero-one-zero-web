import { IVoteItem } from '@/api';
import Image from 'next/image';

type VoteResultItemProp = {
  vote: IVoteItem;
  peopleMaxSize: number;
};

function VoteResultItem({ vote, peopleMaxSize }: VoteResultItemProp) {
  const { voteValueId, voteLabel, selectedSize } = vote;
  const ratio: number = Math.round((selectedSize / peopleMaxSize) * 100 * 10) / 10;

  return (
    <li
      key={voteValueId}
      className="relative flex justify-between items-center rounded-xl border border-indigo-200 overflow-hidden p-4"
    >
      <span className="z-10">
        {voteLabel} {ratio}%
      </span>
      <div
        style={{ width: `${ratio}%` }}
        className={`absolute top-0 left-0 h-full ${ratio !== 0 && 'border-r'} border-indigo-200 bg-indigo-100`}
      >
        <span className="hidden">view percentage of vote item</span>
      </div>
      <div className="flex justify-end items-center">
        <Image className="mr-1" width={15} height={15} src="/image/user.svg" alt="person" />
        <span>{selectedSize}</span>
      </div>
    </li>
  );
}

export default VoteResultItem;
