'use client';

import { getVoteResultListAPI, VoteResultInfo } from '@/api';
import VoteMenu from '@/components/VoteMenu';
import { RoomContext } from '@/context/RoomContext';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

export default function VoteResultPage() {
  const { roomId } = useContext(RoomContext);
  const [voteResult, setVoteResult] = useState<VoteResultInfo>({
    voteTitle: '',
    result: [],
    peopleMaxSize: 0,
    cumulativeVoteCount: 0,
  });

  console.log(voteResult);

  /** @todo 서버에서 주어지는 데이터 모델 확정 후 변경*/
  // const userAllNumber = parseInt(voteObject?.user.split('/')[1] || '0');
  // const voteUserNumber = parseInt(voteObject?.user.split('/')[0] || '0');

  const fetchVoteResult = async () => {
    try {
      const res = await getVoteResultListAPI(roomId!);
      setVoteResult(res);
    } catch (error) {
      throw new Error('투표 결과를 가져오지 못했어요!');
    }
  };

  useEffect(() => {
    fetchVoteResult();
  }, []);

  return (
    <main className="bg-yellow-50 relative flex flex-col h-screen justify-around py-10 px-8">
      {voteResult?.result?.length === 0 && <p>투표가 없습니다.</p>}
      <h1 className="text-2xl font-bold text-center">{voteResult?.voteTitle}</h1>
      <div className="flex justify-end">
        <Image className=" inline" width={30} height={30} src="/image/icon-user-fill.png" alt="person" />
        <p>
          {voteResult?.cumulativeVoteCount}/{voteResult?.peopleMaxSize}
        </p>
      </div>
      <ul className="w-full flex flex-col justify-evenly gap-4">
        {voteResult?.result &&
          voteResult?.result.map((item) => {
            return (
              <li key={item.voteValueId} className={clsx('relative w-full flex border p-4')}>
                <div className="flex flex-1 justify-between">{item.voteLabel}</div>
                <div className="flex justify-end">
                  <Image className=" inline" width={30} height={30} src="/image/icon-user-fill.png" alt="person" />
                  <span>{item.selectedSize}</span>
                </div>
              </li>
            );
          })}
      </ul>
      {/* <p className="mb-4">과반수 이상일 시 투표 현황을 공개합니다.</p> */}
      <VoteMenu share={false} />
    </main>
  );
}
