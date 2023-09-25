'use client';

import { getVoteAPI, getVoteResultListAPI, VoteResultInfo } from '@/api';
import VoteMenu from '@/components/VoteMenu';
import VoteResultItem from '@/components/VoteResultItem';
import { RoomContext } from '@/context/RoomContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

export default function VoteResultPage() {
  const { roomCode, roomId } = useContext(RoomContext);
  const [voteResult, setVoteResult] = useState<VoteResultInfo>({
    voteTitle: '',
    result: [],
    peopleMaxSize: 0,
    cumulativeVoteCount: 0,
  });
  const [isOvered, setIsOvered] = useState<boolean>();
  const { voteTitle, peopleMaxSize, cumulativeVoteCount } = voteResult;

  useEffect(() => {
    const fetchVoteResult = async () => {
      try {
        const res = await getVoteResultListAPI(roomId!);
        const { overed } = await getVoteAPI(roomCode!);
        setVoteResult(res);
        setIsOvered(overed);
      } catch (error) {
        throw new Error('투표 결과를 가져오지 못했어요!');
      }
    };
    fetchVoteResult();
  }, [roomCode, roomId]);

  // console.log(voteResult);

  return (
    <main className="flex flex-col h-screen justify-between items-center py-10 px-8">
      {voteResult?.result?.length === 0 && <p>투표 항목이 없어요. 다시 만들어 주세요.</p>}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center">{voteTitle}</h1>
        <span className="w-20 text-center text-sm bg-indigo-400 text-white text-bold rounded-[18px] p-1 mt-4">
          {isOvered ? '종료됨' : '진행중'}
        </span>
      </div>

      <ul className="w-full flex flex-col justify-evenly gap-4 relative">
        {voteResult?.result.map((item) => (
          <VoteResultItem key={item.voteValueId} vote={item} peopleMaxSize={voteResult?.peopleMaxSize} />
        ))}
        <div className="absolute -top-8 right-0 flex justify-end items-center">
          <Image className="mr-1" width={15} height={15} src="/image/user.svg" alt="person" />
          <p>
            {cumulativeVoteCount}/{peopleMaxSize}
          </p>
        </div>
      </ul>
      <VoteMenu share={false} />
    </main>
  );
}
